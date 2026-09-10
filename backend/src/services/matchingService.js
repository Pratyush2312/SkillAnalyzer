import Student from './../models/Student.js';
import JobRole from './../models/JobRole.js';

export const getMatchedSkills = (userSkills, jobSkills) => {
    return jobSkills.filter(skill => userSkills.includes(skill));
}

export const getMissingSkills = (userSkills, requiredSkills) => {
    return requiredSkills.filter(
        skill => !userSkills.includes(skill)
    );
};

export const calculateMatchPercentage = (
    matchedSkills,
    requiredSkills
) => {
    if (requiredSkills.length === 0) {
        return 0;
    }

    return Math.round(
        (matchedSkills.length / requiredSkills.length) * 100
    );
};

export const getStudentForMatching = async (userId) => {
    const student = await Student.findOne({
        user: userId
    });
    return student;
};

export const getJobRole = async (role) => {
    const job = await JobRole.findOne({ job_role: role });

    return job;
}


export const matchStudentToRole = async (userId, role) => { 
    const student = await getStudentForMatching(userId);
    if (!student) {
        throw new Error("Student profile not found");
    }
    const job = await getJobRole(role);
    if (!job) {
        throw new Error("Job role not found");
    }
    const skills = [...new Set(student.technical_skills.concat(student.programming_languages))]
    const matchedSkills = getMatchedSkills(skills, job.required_skills);
    const missingRequiredSkills = getMissingSkills(skills, job.required_skills);
    const missingOptionalSkills = getMissingSkills(skills, job.optional_skills);
    const percentage = calculateMatchPercentage(matchedSkills, job.required_skills);

    return({
        role,
        percentage,
        matchedSkills,
        missingRequiredSkills,
        missingOptionalSkills,
    });
}




