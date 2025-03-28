//fileRoutes.js

const express = require('express');
const upload = require('../middlewares/multerConfig');  // File upload configuration
const { uploadFile, getFileDetails } = require('../controllers/fileController');  // File controller functions
const { isAuthenticated } = require('../middlewares/authMiddleware');  // Authentication middleware

const router = express.Router();

// Route to upload a file, with authentication check
router.post('/upload', isAuthenticated, upload.single('file'), uploadFile);

// Route to get file details by file ID, with authentication check
router.get('/:id', isAuthenticated, getFileDetails);

module.exports = router;  // Export the file routes for use in the app
