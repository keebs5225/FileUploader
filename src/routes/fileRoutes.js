// fileRoutes.js

// Importing necessary modules and controllers
const express = require('express');
const upload = require('../middlewares/multerConfig');
const { uploadFile, getFileDetails, getUserFiles, deleteFile } = require('../controllers/fileController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

// Defining routes for file operations
router.post('/upload', isAuthenticated, upload.single('file'), uploadFile);
router.get('/:id', isAuthenticated, getFileDetails);
router.get('/', isAuthenticated, getUserFiles); // Route to get all user files
router.delete('/:id', isAuthenticated, deleteFile);

module.exports = router;
