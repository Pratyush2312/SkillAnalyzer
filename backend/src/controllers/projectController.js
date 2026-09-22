import {
    createProject,
    getUserProjects,
} from "../services/projectService.js";

export const addProject = async (req, res) => {
    try {
        const project = await createProject(
            req.user._id,
            req.body
        );

        res.status(201).json({
            success: true,
            project,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message,
        });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await getUserProjects(req.user._id);

        res.json({
            success: true,
            projects,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
        });
    }
};