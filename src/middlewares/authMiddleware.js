//authMiddleware.js

// Middleware to check if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();  // Proceed if authenticated
  res.status(401).json({ message: 'Unauthorized' });  // Return Unauthorized if not authenticated
};
