import Project from "../models/Project.js";
import { addSkillEvidence } from "./skillService.js";

export const createProject = async (userId, data) => {
    const project = await Project.create({
        user: userId,
        ...data,
    });

    for (const skill of data.skills || []) {
        await addSkillEvidence({
            user: userId,
            skillName: skill,
            type: "project",
            source: "project",
            sourceId: project._id.toString(),
            description: `Skill demonstrated through project: ${project.title}`,
            proficiency: 75,
        });
    }

    return project;
};

export const getUserProjects = async (userId) => {
    return Project.find({
        user: userId,
    }).sort({ createdAt: -1 });
};