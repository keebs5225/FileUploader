// multerConfig.js

// Importing Multer for handling file uploads
const multer = require('multer');

// Set up memory storage for Multer (storing file in memory, you can change this to diskStorage if required)
const storage = multer.memoryStorage();  // Memory storage setup
const upload = multer({ storage });  // Set up multer to use the memory storage

module.exports = upload;  // Export the upload middleware to use in file routes
