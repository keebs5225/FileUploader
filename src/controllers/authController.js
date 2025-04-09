// authController.js

const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Hash password function
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { hashedPassword, salt };
};

// Verify password function
const checkPassword = (password, hashedPassword, salt) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === hashedPassword;
};

// Register User
exports.register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const { hashedPassword, salt } = hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        salt,
      },
    });

    res.status(201).json({ message: 'Signup successful! Please log in.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !checkPassword(password, user.password, user.salt)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.user = { email: user.email };
    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout User
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('/auth/login');
  });
};

// Middleware to check authentication
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/auth/login');
};
