import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
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

        issuer: {
            type: String,
            trim: true,
        },

        skills: {
            type: [String],
            default: [],
        },

        credentialUrl: {
            type: String,
            trim: true,
        },

        issuedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Certificate", certificateSchema);