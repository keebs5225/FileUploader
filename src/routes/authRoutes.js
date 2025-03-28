//authRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// Render login page with flash messages
router.get('/login', (req, res) => {
    res.render('login', { messages: req.flash() });
});

// Handle login form submission with Passport's LocalStrategy
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true, // Enable flash messages on failure
    successFlash: 'Welcome back!', // Add success flash message
}));

// Render signup page
router.get('/signup', (req, res) => {
    res.render('signup', { messages: req.flash() });
});

// Handle signup form submission
router.post('/register', authController.register);

module.exports = router;
