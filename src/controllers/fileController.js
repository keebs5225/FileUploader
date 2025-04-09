// fileController.js

// Importing services for database and cloud storage
const prisma = require('../services/prismaService');
const cloudStorage = require('../services/cloudStorageService');

// Function to handle file upload
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' }); // Return if file is not in req.file
    }

    // Continue with file upload to Cloudinary
    const fileUrl = await cloudStorage.upload(req.file);
    console.log('File uploaded to Cloudinary, URL:', fileUrl);
    
    // Save file details to database
    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        url: fileUrl,
        userId: req.user.id,
      },
    });

    res.status(201).json(file); // Send response after file upload and save
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get details of a specific file
exports.getFileDetails = async (req, res) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: req.params.id } });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New function to get all files for the logged-in user
exports.getUserFiles = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }, // Sort by latest uploaded
    });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a file
exports.deleteFile = async (req, res) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: req.params.id } });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Optional: delete from cloud storage if needed
    // await cloudStorage.delete(file.url); // Only if you implement deletion there

    await prisma.file.delete({ where: { id: req.params.id } });

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: error.message });
  }
};
