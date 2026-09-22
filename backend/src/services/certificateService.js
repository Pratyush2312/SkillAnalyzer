import Certificate from "../models/Certificate.js";
import { addSkillEvidence } from "./skillService.js";

export const createCertificate = async (userId, data) => {
    const certificate = await Certificate.create({
        user: userId,
        ...data,
    });

    for (const skill of data.skills || []) {
        await addSkillEvidence({
            user: userId,
            skillName: skill,
            type: "certificate",
            source: data.issuer || "certificate",
            sourceId: certificate._id.toString(),
            description: `Skill certified through: ${certificate.title}`,
            proficiency: 65,
        });
    }

    return certificate;
};

export const getUserCertificates = async (userId) => {
    return Certificate.find({
        user: userId,
    }).sort({ issuedAt: -1 });
};