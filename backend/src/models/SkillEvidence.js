import mongoose from "mongoose";

const skillEvidenceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true,
        },

        type: {
            type: String,
            enum: [
                "profile",
                "project",
                "assessment",
                "certificate",
                "course",
                "experience",
            ],
            required: true,
        },

        source: {
            type: String,
        },

        sourceId: {
            type: String,
        },

        description: {
            type: String,
        },

        proficiency: {
            type: Number,
            min: 0,
            max: 100,
        },

        observedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

export default mongoose.model("SkillEvidence", skillEvidenceSchema);