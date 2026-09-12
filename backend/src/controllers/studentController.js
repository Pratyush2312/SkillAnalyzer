import Student from "../models/Student.js";

export const createProfile = async (req, res) => {
    try {
        const {
            name,
            year,
            current_course,
            technical_skills,
            programming_languages,
            technical_rating,
            soft_skills,
            soft_skill_rating,
            projects,
            career_interest,
            challenges,
            support_required,
            method
        } = req.body;

        const student = await Student.create({
            user: req.user._id,
            name,
            email: req.user.email,
            year,
            current_course,
            technical_skills,
            programming_languages,
            technical_rating,
            soft_skills,
            soft_skill_rating,
            projects,
            career_interest,
            challenges,
            support_required,
            method
        });

        return res.status(201).json({
            message: "Student Profile Created",
            student
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const id = req.user._id;
        if (!id) {
            return res.status(401).json({
                message: "Invalid Student"
            })
        }
        console.log(id);
        const student = await Student.findOne({user:id});
        console.log(student);
        return res.status(200).json({
            message: "User Found",
            data: student,
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => { 
    try {
        const id = req.user._id;
        const body = req.body;
        console.log(body);
        await Student.findOneAndUpdate({ user: id }, body);
        return res.status(200).json({
            message:"Details Updated"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}