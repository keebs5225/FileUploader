// app.js

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const folderRoutes = require('./routes/folderRoutes');
require('dotenv').config();
require('./middlewares/authMiddleware');
require('./middlewares/passportConfig');

const app = express();

app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.urlencoded({ extended: true })); // Support form submissions
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Enable flash messages

// Global flash message handling middleware
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success'); // Success messages
    res.locals.error_message = req.flash('error');     // Error messages
    res.locals.user = req.user || null; // Pass user data to all views
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/folders', folderRoutes);

// Root Route - Render the index page
app.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

// // Dashboard Route (Optional if you still need a dashboard route)
// app.get('/dashboard', (req, res) => {
//     if (!req.isAuthenticated()) {
//         return res.redirect('/auth/login'); // Redirect if not logged in
//     }
//     res.render('dashboard', { user: req.user });
// });

module.exports = app;
