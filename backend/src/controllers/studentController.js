import Student from "../models/Student.js";
import { syncProfileSkillEvidence } from "../services/skillService.js";

export const createProfile = async (req, res) => {
    try {
        const {
            name,
            year,
            current_course,
            technical_skills,
            programming_languages,
            soft_skills,
            career_interest,
            challenges,
            support_required,
            method,
        } = req.body;

        const existingStudent = await Student.findOne({
            user: req.user._id,
        });

        if (existingStudent) {
            return res.status(409).json({
                message: "Student profile already exists",
            });
        }

        const student = await Student.create({
            user: req.user._id,
            name,
            email: req.user.email,
            year,
            current_course,
            technical_skills,
            programming_languages,
            soft_skills,
            career_interest,
            challenges,
            support_required,
            method,
        });

        // Sync self-reported skills into the unified SkillEvidence layer
        await syncProfileSkillEvidence({
            user: req.user._id,
            technicalSkills: student.technical_skills,
            programmingLanguages: student.programming_languages,
            softSkills: student.soft_skills,
        });

        return res.status(201).json({
            message: "Student Profile Created",
            student,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const id = req.user._id;

        if (!id) {
            return res.status(401).json({
                message: "Invalid Student",
            });
        }

        const student = await Student.findOne({
            user: id,
        });

        if (!student) {
            return res.status(404).json({
                message: "Student profile not found",
            });
        }

        return res.status(200).json({
            message: "User Found",
            data: student,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const id = req.user._id;

        const {
            name,
            year,
            current_course,
            technical_skills,
            programming_languages,
            soft_skills,
            career_interest,
            challenges,
            support_required,
            method,
        } = req.body;

        const student = await Student.findOneAndUpdate(
            { user: id },
            {
                name,
                year,
                current_course,
                technical_skills,
                programming_languages,
                soft_skills,
                career_interest,
                challenges,
                support_required,
                method,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student profile not found",
            });
        }

        // Replace old profile evidence with the updated skill set
        await syncProfileSkillEvidence({
            user: req.user._id,
            technicalSkills: student.technical_skills,
            programmingLanguages: student.programming_languages,
            softSkills: student.soft_skills,
        });

        return res.status(200).json({
            message: "Details Updated",
            student,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};