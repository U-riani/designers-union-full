// backend/routes/adminRoutes.js
const express = require('express');
const { loginAdmin, getAdminDashboard } = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/authMiddleware');

const dbMiddleware = require("../middleware/dbMiddleware");

const router = express.Router();

router.use(dbMiddleware);

// Admin login route
router.post('/login', loginAdmin);

// Protected admin route
router.get('/dashboard', authenticateToken, getAdminDashboard);

module.exports = router;
