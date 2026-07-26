// middleware/imageMiddleware.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ================================
// CONFIG
// ================================

// CHANGE THESE
const HOSTGATOR_USERNAME = HOSTGATOR_USERNAME;
const DOMAIN = DOMAIN_NAME;

// Absolute path on HostGator
const UPLOAD_DIR = `/home/${HOSTGATOR_USERNAME}/public_html/uploads`;

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ================================
// MULTER CONFIG
// ================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ================================
// HELPERS
// ================================

const getPublicUrl = (filename) => `${DOMAIN}/uploads/${filename}`;

const deleteFromHostGator = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const filename = imageUrl.split("/").pop();
    const filePath = path.join(UPLOAD_DIR, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Deleted image:", filename);
    }
  } catch (err) {
    console.error("Failed to delete image:", err);
  }
};

// ================================
// MAIN MIDDLEWARE
// ================================

const handleImageUpload = async (req, res, next) => {
  const isDesignerRoute = req.originalUrl.includes("/designers");

  const multerHandler = isDesignerRoute
    ? upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "projectImage", maxCount: 1 },
      ])
    : upload.array("images", 20);

  multerHandler(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: "Image upload error",
        message: err.message,
      });
    }

    if (!req.files) return next();

    if (isDesignerRoute) {
      const urls = {};

      if (req.files.profileImage?.[0]) {
        urls.profileImage = getPublicUrl(
          req.files.profileImage[0].filename
        );
      }

      if (req.files.projectImage?.[0]) {
        urls.projectImage = getPublicUrl(
          req.files.projectImage[0].filename
        );
      }

      req.fileUrls = urls;
    } else {
      req.fileUrls = req.files.map((file) =>
        getPublicUrl(file.filename)
      );
    }

    next();
  });
};

module.exports = {
  handleImageUpload,
  deleteFromHostGator,
};
