import mongoose from "mongoose";
import dotenv from "dotenv";

import Student from "../src/models/Student.js";
import { addSkillEvidence } from "../src/services/skillService.js";

dotenv.config();

const migrateSkills = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to MongoDB");

        const students = await Student.find({});

        let created = 0;
        let skipped = 0;

        for (const student of students) {
            const skills = [
                ...(student.technical_skills || []),
                ...(student.programming_languages || []),
                ...(student.soft_skills || []),
            ]
                .flatMap((skill) =>
                    String(skill)
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                );

            for (const skill of skills) {
                if (!skill?.trim()) continue;

                const normalized = skill.trim().toLowerCase();

                // Prevent duplicate profile evidence
                const SkillEvidence = (
                    await import("../src/models/SkillEvidence.js")
                ).default;

                const existing = await SkillEvidence.findOne({
                    user: student.user,
                    type: "profile",
                    source: "student_profile",
                    description: `Student listed ${skill} as a profile skill`,
                });

                if (existing) {
                    skipped++;
                    continue;
                }

                await addSkillEvidence({
                    user: student.user,
                    skillName: normalized,
                    type: "profile",
                    source: "student_profile",
                    description: `Student listed ${skill} as a profile skill`,
                    proficiency: student.technical_rating
                        ? student.technical_rating * 20
                        : 50,
                });

                created++;
            }
        }

        console.log(`Created: ${created}`);
        console.log(`Skipped: ${skipped}`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

migrateSkills();