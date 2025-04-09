//folderRoutes.js

const express = require('express');
const { createFolder } = require('../controllers/folderController');  // Folder creation controller
const { isAuthenticated } = require('../middlewares/authMiddleware');  // Authentication middleware

const router = express.Router();

// Route to create a folder, with authentication check
router.post('/create', isAuthenticated, createFolder);

module.exports = router;  // Export the folder routes for use in the app
