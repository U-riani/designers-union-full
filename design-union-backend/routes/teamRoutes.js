// routes/teamRoutes.js
const express = require("express");
const {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");
const { handleImageUpload } = require("../middleware/imageMiddleware");

const dbMiddleware = require("../middleware/dbMiddleware");

const router = express.Router();

router.use(dbMiddleware);
router.get("/", getTeamMembers);
router.post("/", handleImageUpload, createTeamMember);
router.patch("/:id", handleImageUpload, updateTeamMember);
router.delete("/:id", deleteTeamMember);

module.exports = router;
