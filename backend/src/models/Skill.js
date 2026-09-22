import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    aliases: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      trim: true,
    },

    subcategory: {
      type: String,
      trim: true,
    },

    relatedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],

    prerequisites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);