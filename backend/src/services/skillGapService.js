import JobRole from "../models/JobRole.js";
import { getSkillGraph, normalizeSkillName } from "./skillService.js";

export const calculateSkillGap = async (userId, roleName) => {
    const role = await JobRole.findOne({
        job_role: roleName,
    });

    if (!role) {
        throw new Error("Job role not found");
    }

    const userSkills = await getSkillGraph(userId);

    const skillMap = new Map();

    userSkills.forEach((item) => {
        skillMap.set(
            normalizeSkillName(item.skill.name),
            item.proficiency
        );
    });

    const requiredSkills = role.required_skills || [];

    const gaps = requiredSkills.map((skill) => {
        const normalized = normalizeSkillName(skill);
        const proficiency = skillMap.get(normalized) || 0;

        return {
            skill,
            normalizedSkill: normalized,
            currentProficiency: proficiency,
            requiredProficiency: 70,
            gap: Math.max(0, 70 - proficiency),
            status:
                proficiency >= 70
                    ? "ready"
                    : proficiency >= 40
                        ? "developing"
                        : "critical",
        };
    });

    const matched = gaps.filter(
        (item) => item.status === "ready"
    );

    const averageGap =
        gaps.length > 0
            ? Math.round(
                gaps.reduce((sum, item) => sum + item.gap, 0) /
                gaps.length
            )
            : 0;

    return {
        role: role.job_role,
        totalRequiredSkills: gaps.length,
        matchedSkills: matched.length,
        averageGap,
        skills: gaps,
    };
};