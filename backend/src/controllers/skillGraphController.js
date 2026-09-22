import {
  addSkillEvidence,
  getSkillGraph,
} from "../services/skillService.js";

export const addEvidence = async (req, res) => {
    try {
        const evidence = await addSkillEvidence({
            user: req.user._id,
            ...req.body,
        });

        res.status(201).json({
            success: true,
            evidence,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to add skill evidence",
        });
    }
};

export const getMySkills = async (req, res) => {
    try {
        const skills = await getSkillGraph(req.user._id);

        res.json({
            success: true,
            skills,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch skill graph",
        });
    }
};