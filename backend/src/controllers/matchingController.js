import { matchStudentToRole } from "../services/matchingService.js";
import { getCareerRecommendations } from "../services/mlService.js";
import Student from "../models/Student.js";

export const getSkillMatch = async (req, res) => {
    try {
        const userId = req.user._id;
        const { role } = req.query;

        if (!role || typeof role !== "string" || !role.trim()) {
            return res.status(400).json({
                success: false,
                message: "Job role is required",
            });
        }

        const normalizedRole = role.trim();

        const result = await matchStudentToRole(userId, normalizedRole);

        return res.status(200).json({
            success: true,
            data: {
                targetJob: result.role,
                matchPercentage: result.percentage,
                matchedSkills: result.matchedSkills,
                missingSkills: result.missingRequiredSkills,
                optionalMissingSkills: result.missingOptionalSkills,
                totalRequiredSkills: result.totalRequiredSkills,
                totalMatchedSkills: result.totalMatchedSkills,
                totalMissingRequiredSkills:
                    result.totalMissingRequiredSkills,
            },
        });
    } catch (error) {
        console.error("Skill matching error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to match skills",
        });
    }
};




export async function generateCareerRecommendations(req, res) {
    try {
        const studentId = req.user._id;

        const student = await Student.findOne({ user: studentId });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found",
            });
        }

        const recommendations = await getCareerRecommendations(student);

        return res.status(200).json({
            success: true,
            recommendations,
        });
    } catch (error) {
        console.error("Career recommendation error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to generate recommendations",
        });
    }
}