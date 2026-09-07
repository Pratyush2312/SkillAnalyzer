import mongoose from "mongoose";

const jobRoleSchema = new mongoose.Schema(
    {
        job_role: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        required_skills: {
            type: [String],
            default: [],
        },

        optional_skills: {
            type: [String],
            default: [],
        },

        experience_level: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const JobRole = mongoose.model("JobRole", jobRoleSchema);

export default JobRole;