import Assessment from "../models/Assessment.js";
import { addSkillEvidence } from "./skillService.js";

export const createAssessment = async (userId, data) => {
    const assessment = await Assessment.create({
        user: userId,
        ...data,
    });

    for (const item of data.skills || []) {
        await addSkillEvidence({
            user: userId,
            skillName: item.skill,
            type: "assessment",
            source: data.provider || "assessment",
            sourceId: assessment._id.toString(),
            description: `${data.title} assessment score`,
            proficiency: item.score,
        });
    }

    return assessment;
};

export const getUserAssessments = async (userId) => {
    return Assessment.find({
        user: userId,
    }).sort({ completedAt: -1 });
};