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

        technical_rating: {
            type: Number,
            min: 1,
            max: 5,
        },

        soft_skills: {
            type: [String],
            default: [],
        },

        soft_skill_rating: {
            type: Number,
            min: 1,
            max: 5,
        },

        projects: {
            type: Boolean,
            default: false,
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
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;