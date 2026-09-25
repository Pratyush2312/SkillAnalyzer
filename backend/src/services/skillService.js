import Skill from "../models/Skill.js";
import SkillEvidence from "../models/SkillEvidence.js";

const SKILL_ALIASES = {
    "react.js": "react",
    "reactjs": "react",
    "react js": "react",

    "node.js": "node",
    "nodejs": "node",
    "node js": "node",

    "express.js": "express",
    "expressjs": "express",

    mongo: "mongodb",
    "mongo db": "mongodb",

    postgres: "postgresql",
    postgre: "postgresql",

    js: "javascript",
    ts: "typescript",

    py: "python",
    cpp: "c++",

    tailwindcss: "tailwind css",
    tailwind: "tailwind css",

    nextjs: "next.js",
    "next js": "next.js",

    vuejs: "vue",
};

export const normalizeSkillName = (skill) => {
    const normalized = String(skill || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    return SKILL_ALIASES[normalized] || normalized;
};

export const getOrCreateSkill = async (name) => {
    const normalized = normalizeSkillName(name);

    if (!normalized) return null;

    let skill = await Skill.findOne({
        name: normalized,
    });

    if (!skill) {
        skill = await Skill.create({
            name: normalized,
        });
    }

    return skill;
};

export const addSkillEvidence = async ({
    user,
    skillName,
    type,
    source,
    sourceId,
    description,
    proficiency,
}) => {
    const skill = await getOrCreateSkill(skillName);

    if (!skill) return null;

    return SkillEvidence.create({
        user,
        skill: skill._id,
        type,
        source,
        sourceId,
        description,
        proficiency,
        observedAt: new Date(),
    });
};

/*
 * Synchronizes skills reported directly by the student profile.
 *
 * Profile evidence is intentionally treated as weaker evidence
 * than projects, assessments, certificates, and experience.
 *
 * Whenever the profile is updated:
 * 1. Old profile evidence is removed.
 * 2. Current profile skills are normalized.
 * 3. Duplicate skills are removed.
 * 4. Fresh profile evidence is created.
 */
export const syncProfileSkillEvidence = async ({
    user,
    technicalSkills = [],
    programmingLanguages = [],
    softSkills = [],
}) => {
    await SkillEvidence.deleteMany({
        user,
        type: "profile",
        source: "student_profile",
    });

    const skills = [
        ...technicalSkills,
        ...programmingLanguages,
        ...softSkills,
    ]
        .flatMap((skill) =>
            String(skill || "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
        )
        .map(normalizeSkillName)
        .filter(Boolean);

    const uniqueSkills = [...new Set(skills)];

    const evidence = [];

    for (const skillName of uniqueSkills) {
        const item = await addSkillEvidence({
            user,
            skillName,
            type: "profile",
            source: "student_profile",
            description: "Student listed this skill in their profile",
            proficiency: 50,
        });

        if (item) {
            evidence.push(item);
        }
    }

    return evidence;
};

export const getUserSkills = async (userId) => {
    return SkillEvidence.find({
        user: userId,
    }).populate("skill");
};

export const calculateSkillProficiency = (evidence) => {
    if (!evidence.length) return 0;

    const weighted = evidence.map((item) => {
        let weight = 1;

        switch (item.type) {
            case "assessment":
                weight = 1.4;
                break;

            case "project":
                weight = 1.3;
                break;

            case "certificate":
                weight = 1.2;
                break;

            case "experience":
                weight = 1.5;
                break;

            case "course":
                weight = 1.1;
                break;

            case "profile":
                weight = 0.7;
                break;
        }

        return (item.proficiency || 0) * weight;
    });

    const totalWeight = evidence.reduce((sum, item) => {
        let weight = 1;

        switch (item.type) {
            case "assessment":
                weight = 1.4;
                break;

            case "project":
                weight = 1.3;
                break;

            case "certificate":
                weight = 1.2;
                break;

            case "experience":
                weight = 1.5;
                break;

            case "course":
                weight = 1.1;
                break;

            case "profile":
                weight = 0.7;
                break;
        }

        return sum + weight;
    }, 0);

    return Math.round(
        Math.min(
            100,
            weighted.reduce((a, b) => a + b, 0) / totalWeight
        )
    );
};

export const getSkillGraph = async (userId) => {
    const evidence = await SkillEvidence.find({
        user: userId,
    }).populate("skill");

    const grouped = {};

    for (const item of evidence) {
        // Ignore invalid/orphaned evidence
        if (!item.skill) continue;

        const skillId = item.skill._id.toString();

        if (!grouped[skillId]) {
            grouped[skillId] = {
                skill: item.skill,
                evidence: [],
            };
        }

        grouped[skillId].evidence.push(item);
    }

    return Object.values(grouped).map((group) => ({
        skill: group.skill,
        proficiency: calculateSkillProficiency(group.evidence),
        evidenceCount: group.evidence.length,
        evidence: group.evidence,
    }));
};