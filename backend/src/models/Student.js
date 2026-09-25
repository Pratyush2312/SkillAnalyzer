import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        year: {
            type: Number,
        },

        current_course: {
            type: String,
            trim: true,
        },

        technical_skills: {
            type: [String],
            default: [],
        },

        programming_languages: {
            type: [String],
            default: [],
        },

        soft_skills: {
            type: [String],
            default: [],
        },

        career_interest: {
            type: String,
            trim: true,
        },

        challenges: {
            type: String,
            trim: true,
        },

        support_required: {
            type: String,
            trim: true,
        },

        method: {
            type: String,
            trim: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;