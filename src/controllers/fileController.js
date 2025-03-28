// fileController.js

const prisma = require('../services/prismaService');  // Prisma client to interact with the database
const cloudStorage = require('../services/cloudStorageService');  // Cloud storage service (Cloudinary, AWS, etc.)

// Controller function to upload files
exports.uploadFile = async (req, res) => {
  try {
    // Upload file to cloud storage (e.g., Cloudinary, AWS S3)
    const fileUrl = await cloudStorage.upload(req.file);

    // Store file metadata in the database using Prisma
    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,  // Original file name
        size: req.file.size,  // File size
        url: fileUrl,  // File URL returned from cloud storage
        userId: req.user.id,  // User ID from the authenticated session
      },
    });

    // Respond with the file metadata
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle any errors
  }
};

// Controller function to get file details by ID
exports.getFileDetails = async (req, res) => {
  try {
    // Fetch file from the database by its ID
    const file = await prisma.file.findUnique({ where: { id: req.params.id } });

    // Return error if the file is not found
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Return file metadata if found
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle any errors
  }
};
