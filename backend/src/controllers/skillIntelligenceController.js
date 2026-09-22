import { getSkillIntelligence } from "../services/skillIntelligenceService.js";

export const getSkillIntelligenceController = async (req, res) => {
    try {
        const { role } = req.query;

        const intelligence = await getSkillIntelligence(
            req.user._id,
            role
        );

        res.status(200).json({
            success: true,
            data: intelligence,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate skill intelligence",
            error: error.message,
        });
    }
};