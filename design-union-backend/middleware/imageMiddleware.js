// // backend/middleware/imageMiddleware.js
// const multer = require("multer");
// const path = require("path");
// const bucket = require("../firebase"); // Import the bucket from firebase.js

// // Init upload middleware to handle multiple files in memory
// const upload = multer({
//   limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 10MB per image
//   storage: multer.memoryStorage(), // Store files in memory
// });

// // Upload to Firebase Storage - modified for multiple files
// const uploadToFirebase = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileName = `${Date.now()}${path.extname(file.originalname)}`;
//     const storageFile = bucket.file(fileName);

//     const stream = storageFile.createWriteStream({
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });

//     stream.on("error", (error) => reject(error.message));

//     stream.on("finish", async () => {
//       try {
//         await storageFile.makePublic();
//         const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//         resolve(fileUrl);
//       } catch (error) {
//         reject(error);
//       }
//     });

//     stream.end(file.buffer);
//   });
// };

// // Delete an image from Firebase by URL
// const deleteFromHostGatorse = async (imageUrl) => {
//   if (!imageUrl) return;

//   const fileName = imageUrl.split("/").pop();
//   const file = bucket.file(fileName);

//   try {
//     await file.delete();
//     console.log("Image deleted successfully from Firebase:", fileName);
//   } catch (error) {
//     console.error("Error deleting image from Firebase:", error);
//   }
// };

// // Middleware for handling multiple image uploads and replacement
// const handleImageUpload = async (req, res, next) => {
//   try {
//     const isDesignerRoute = req.originalUrl.includes("/designers");

//     const multerHandler = isDesignerRoute
//       ? upload.fields([
//           { name: "profileImage", maxCount: 1 },
//           { name: "projectImage", maxCount: 1 },
//         ])
//       : upload.array("images", 20);

//     await multerHandler(req, res, async (err) => {
//       if (err) {
//         console.error("Multer error:", err);
//         return res.status(400).json({
//           error: "Error in image upload middleware",
//           message: err.message,
//         });
//       }

//       // // If there are files uploaded, handle them
//       // if (req.files) {
//       //   // Upload each new image to Firebase
//       //   const imageUrls = [];
//       //   for (const file of req.files) {
//       //     const fileUrl = await uploadToFirebase(file);
//       //     imageUrls.push(fileUrl);
//       //   }

//       //   // Set the file URLs in the request object to pass to the controller
//       //   req.fileUrls = imageUrls;
//       // }
//       // If there are uploaded files, process them
//       if (req.files) {
//         if (isDesignerRoute) {
//           // Special handling for designers: separate profile and project image
//           const uploadedUrls = {};

//           if (req.files.profileImage && req.files.profileImage[0]) {
//             uploadedUrls.profileImage = await uploadToFirebase(
//               req.files.profileImage[0]
//             );
//           }

//           if (req.files.projectImage && req.files.projectImage[0]) {
//             uploadedUrls.projectImage = await uploadToFirebase(
//               req.files.projectImage[0]
//             );
//           }

//           req.fileUrls = uploadedUrls;
//         } else {
//           if (!isDesignerRoute && req.files) {
//             req.files.forEach((file) => {
//               console.log("UPLOAD DEBUG:", {
//                 name: file.originalname,
//                 mimetype: file.mimetype,
//                 size: file.size,
//               });
//             });
//           }

//           // Generic handling for others
//           const uploadPromises = req.files.map(uploadToFirebase);
//           const results = await Promise.allSettled(uploadPromises);

//           req.fileUrls = results
//             .filter((res) => res.status === "fulfilled")
//             .map((res) => res.value);

//           const failedUploads = results.filter(
//             (res) => res.status === "rejected"
//           );
//           if (failedUploads.length > 0) {
//             console.warn("Some images failed to upload:", failedUploads);
//           }
//         }
//       }

//       next();
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error handling image upload", error });
//   }
// };

// module.exports = {
//   handleImageUpload,
//   deleteFromHostGatorse, // Export the delete function
// };

// backend/middleware/imageMiddleware.js
const multer = require("multer");
const { uploadBuffer, deleteByUrl } = require("../lib/hostgatorSftp");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter: (req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

async function uploadOne(file) {
  const { url } = await uploadBuffer(file.buffer, file.originalname);
  return url;
}

const handleImageUpload = async (req, res, next) => {
  const isDesignerRoute = req.originalUrl.includes("/designers");

  const multerHandler = isDesignerRoute
    ? upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "projectImage", maxCount: 1 },
      ])
    : upload.array("images", 20);

  multerHandler(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        error: "Image upload error",
        message: err.message,
      });
    }

    try {
      if (!req.files) return next();

      if (isDesignerRoute) {
        const urls = {};

        if (req.files.profileImage?.[0]) {
          urls.profileImage = await uploadOne(req.files.profileImage[0]);
        }
        if (req.files.projectImage?.[0]) {
          urls.projectImage = await uploadOne(req.files.projectImage[0]);
        }

        req.fileUrls = urls;
      } else {
        const files = req.files || [];
        const results = await Promise.allSettled(files.map(uploadOne));

        req.fileUrls = results
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value);

        const failed = results.filter((r) => r.status === "rejected");
        if (failed.length) console.warn("Some image uploads failed:", failed);
      }

      next();
    } catch (e) {
      return res.status(500).json({
        message: "HostGator upload failed",
        error: e.message || String(e),
      });
    }
  });
};

module.exports = {
  handleImageUpload,
  deleteFromHostGator: deleteByUrl,
};
