import {
    createAssessment,
    getUserAssessments,
} from "../services/assessmentService.js";

export const addAssessment = async (req, res) => {
    try {
        const assessment = await createAssessment(
            req.user._id,
            req.body
        );

        res.status(201).json({
            success: true,
            assessment,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create assessment",
            error: error.message,
        });
    }
};

export const getAssessments = async (req, res) => {
    try {
        const assessments = await getUserAssessments(
            req.user._id
        );

        res.json({
            success: true,
            assessments,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch assessments",
        });
    }
};