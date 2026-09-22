import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        provider: {
            type: String,
            trim: true,
        },

        skills: [
            {
                skill: {
                    type: String,
                    required: true,
                },

                score: {
                    type: Number,
                    min: 0,
                    max: 100,
                    required: true,
                },
            },
        ],

        completedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Assessment", assessmentSchema);