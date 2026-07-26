// backend/controllers/adminController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD_HASH,
  JWT_SECRET,
} = process.env;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
  throw new Error("Missing admin authentication environment variables");
}

/**
 * POST /admin/login
 */
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (username !== ADMIN_USERNAME) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username, role: "admin" },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    message: "Login successful",
    token,
  });
};

/**
 * GET /admin/dashboard
 */
const getAdminDashboard = (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}. You have admin access.`,
  });
};

module.exports = {
  loginAdmin,
  getAdminDashboard,
};
