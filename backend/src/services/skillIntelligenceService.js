import { getSkillGraph } from "./skillService.js";
import { calculateSkillGap } from "./skillGapService.js";

export const getSkillIntelligence = async (userId, role) => {
    const skills = await getSkillGraph(userId);

    let gap = null;

    if (role) {
        gap = await calculateSkillGap(userId, role);
    }

    const summary = {
        totalSkills: skills.length,

        strongSkills: skills.filter(
            (skill) => skill.proficiency >= 70
        ).length,

        developingSkills: skills.filter(
            (skill) =>
                skill.proficiency >= 40 &&
                skill.proficiency < 70
        ).length,

        weakSkills: skills.filter(
            (skill) => skill.proficiency < 40
        ).length,
    };

    return {
        summary,
        skills,
        gap,
    };
};