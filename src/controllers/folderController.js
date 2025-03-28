// folderController.js

const prisma = require('../services/prismaService');  // Prisma client to interact with the database

// Controller function to create a folder
exports.createFolder = async (req, res) => {
  try {
    // Create a new folder and associate it with the authenticated user
    const folder = await prisma.folder.create({
      data: {
        name: req.body.name,  // Folder name passed in the request body
        userId: req.user.id,  // User ID from the authenticated session
      },
    });

    // Respond with the created folder metadata
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle any errors
  }
};
