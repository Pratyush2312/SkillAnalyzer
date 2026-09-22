import Roadmap from "../models/RoadMap.js";
import { calculateSkillGap } from "./skillGapService.js";

export const getPersonalizedRoadmap = async (userId, roleName) => {
    const gapData = await calculateSkillGap(userId, roleName);

    const missingSkills = gapData.skills
        .filter((skill) => skill.status !== "ready")
        .map((skill) => skill.normalizedSkill);

    if (!missingSkills.length) {
        return {
            role: roleName,
            message: "No major skill gaps found.",
            skills: [],
        };
    }

    const allRoadmaps = await Roadmap.find({
        career: roleName,
    }).sort({ order: 1 });

    const roadmap = allRoadmaps.filter((item) =>
        missingSkills.includes(item.skill.toLowerCase().trim())
    );

    return {
        role: roleName,
        averageGap: gapData.averageGap,
        skills: roadmap,
    };
};