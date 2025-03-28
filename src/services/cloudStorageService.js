//cloudStorageServerice.js

const cloudinary = require('cloudinary').v2; // Cloudinary SDK
require('dotenv').config(); // Load environment variables

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload the file to Cloudinary
exports.upload = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, // Automatically detect file type
      (error, result) => {
        if (error) {
          reject(error); // Reject the promise on error
        } else {
          resolve(result.secure_url); // Return the secure URL of the uploaded file
        }
      }
    );

    // Pipe the file buffer into the Cloudinary upload stream
    uploadStream.end(file.buffer);
  });
};
