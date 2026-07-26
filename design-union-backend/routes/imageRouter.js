// backend/routes/imageRouter.js
const express = require("express");
const dbMiddleware = require("../middleware/dbMiddleware");

const router = express.Router();

router.use(dbMiddleware);
// const uploadImage = require('../controllers/imageController');
// const upload = require('../middleware/imageMiddleware');
const { handleImageUpload } = require("../middleware/imageMiddleware");

// Upload route
router.post("/upload", handleImageUpload);

module.exports = router;
