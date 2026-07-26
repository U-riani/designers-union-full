// models/TeamMember.js
const mongoose = require("mongoose");

const LocalizedStringSchema = new mongoose.Schema(
  {
    ge: { type: String, default: "" },
    en: { type: String, default: "" },
  },
  { _id: false }
);

const TeamMemberSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["featured", "board"],
      required: true,
    },

    name: {
      type: LocalizedStringSchema,
      required: true,
    },

    position: {
      type: LocalizedStringSchema,
      required: true,
    },

    // Featured only
    description: {
      type: LocalizedStringSchema,
    },

    responsibilities: {
      ge: [{ type: String }],
      en: [{ type: String }],
    },

    // Board only
    shortDescription: {
      type: LocalizedStringSchema,
    },

    image: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
