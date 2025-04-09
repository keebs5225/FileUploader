// cloudStorageService.js

// Importing Cloudinary SDK and dotenv for environment variables
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

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
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log('File uploaded to Cloudinary, URL:', result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

// Function to delete a file from Cloudinary using its public ID
exports.delete = async (fileUrl) => {
  try {
    // Extract the public ID from the Cloudinary URL
    const publicId = extractPublicId(fileUrl);
    if (!publicId) throw new Error('Invalid Cloudinary URL');

    // Delete the file from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'auto',
    });

    console.log('Cloudinary delete result:', result);
    return result;
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    throw error;
  }
};

// Helper to extract public ID from URL | Example URL: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
function extractPublicId(url) {
  const parts = url.split('/');
  const fileWithExtension = parts[parts.length - 1]; // e.g., sample.jpg
  const publicIdWithFolder = parts.slice(parts.indexOf('upload') + 1).join('/').split('.')[0];
  return publicIdWithFolder;
}
