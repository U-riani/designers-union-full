// backend/controllers/teamController.js
const TeamMember = require("../models/TeamMember");
const { deleteFromHostGator } = require("../middleware/imageMiddleware");

/**
 * GET /api/team
 * Public endpoint – only active members
 */
exports.getTeamMembers = async (req, res) => {
  try {
    const team = await TeamMember.find({ active: true }).sort({ order: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch team members",
      error: error.message,
    });
  }
};

/**
 * POST /api/team
 * Create team member
 */
exports.createTeamMember = async (req, res) => {
  try {
    const {
      type,
      name,
      position,
      description,
      shortDescription,
      responsibilities,
      order,
      active,
    } = req.body;

    // Basic required validation
    if (!type || !name?.ge || !position?.ge) {
      return res.status(400).json({
        message: "Missing required fields (type, name.ge, position.ge)",
      });
    }

    if (!["featured", "board"].includes(type)) {
      return res.status(400).json({
        message: "Invalid team member type",
      });
    }

    // Type-specific validation
    if (type === "featured" && !description?.ge) {
      return res.status(400).json({
        message: "Featured member requires description",
      });
    }

    if (type === "board" && !shortDescription?.ge) {
      return res.status(400).json({
        message: "Board member requires shortDescription",
      });
    }

    // Image validation
    if (!req.fileUrls || req.fileUrls.length === 0) {
      return res.status(400).json({ message: "Image is required" });
    }

    const payload = {
      type,
      name,
      position,
      image: req.fileUrls[0],
      order: order !== undefined ? Number(order) : 0,
      active: active !== undefined ? active === "true" : true,
    };

    if (type === "featured") {
      payload.description = description;
      payload.responsibilities = responsibilities;
    }

    if (type === "board") {
      payload.shortDescription = shortDescription;
    }

    const member = await TeamMember.create(payload);
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create team member",
      error: error.message,
    });
  }
};

/**
 * PATCH /api/team/:id
 * Update team member
 */
exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await TeamMember.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    // Replace image if new one uploaded
    if (req.fileUrls && req.fileUrls.length > 0) {
      await deleteFromHostGator (member.image);
      member.image = req.fileUrls[0];
    }

    // Whitelisted fields only
    const allowedFields = [
      "type",
      "name",
      "position",
      "description",
      "shortDescription",
      "responsibilities",
      "order",
      "active",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === "order") {
          member[field] = Number(req.body[field]);
        } else if (field === "active") {
          member[field] = req.body[field] === "true";
        } else {
          member[field] = req.body[field];
        }
      }
    });

    // Re-validate type rules after update
    if (member.type === "featured" && !member.description?.ge) {
      return res.status(400).json({
        message: "Featured member must have description",
      });
    }

    if (member.type === "board" && !member.shortDescription?.ge) {
      return res.status(400).json({
        message: "Board member must have shortDescription",
      });
    }

    await member.save();
    res.json(member);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update team member",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/team/:id
 * Hard delete
 */
exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await TeamMember.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    await deleteFromHostGator (member.image);
    await member.deleteOne();

    res.json({ message: "Team member deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete team member",
      error: error.message,
    });
  }
};
