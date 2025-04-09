//passportConfig.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Function to verify password
const checkPassword = (password, hashedPassword, salt) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === hashedPassword;
};

// Passport strategy for local authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use email for login
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        // Verify password using salt
        const isMatch = checkPassword(password, user.password, user.salt);

        if (isMatch) {
          return done(null, user); // User authenticated
        } else {
          return done(null, false, { message: 'Invalid credentials' });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user to store ID in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user by retrieving from database
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
