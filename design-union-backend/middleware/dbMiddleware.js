// backend/middleware/dbMiddleware.js
const connectDB = require("../lib/db");

module.exports = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
};
