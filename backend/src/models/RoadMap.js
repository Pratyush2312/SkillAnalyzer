import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        platform: {
            type: String,
            required: true,
            trim: true,
        },

        url: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        difficulty: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },
    },
    { _id: false }
);

const roadmapSchema = new mongoose.Schema(
    {
        career: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        skill: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        order: {
            type: Number,
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        topics: {
            type: [String],
            required: true,
            default: [],
        },

        estimatedTime: {
            type: String,
            trim: true,
        },

        resources: {
            videos: {
                type: [resourceSchema],
                default: [],
            },

            documentation: {
                type: [resourceSchema],
                default: [],
            },

            courses: {
                type: [resourceSchema],
                default: [],
            },

            hands_on_projects: {
                type: [projectSchema],
                default: [],
            },
        },
    },
    {
        timestamps: true,
    }
);

roadmapSchema.index({ career: 1, order: 1 });

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;