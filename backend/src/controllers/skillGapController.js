import { calculateSkillGap } from "../services/skillGapService.js";

export const getSkillGap = async (req, res) => {
    try {
        const { role } = req.query;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required",
            });
        }

        const result = await calculateSkillGap(
            req.user._id,
            role
        );

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};