import Student from "./../models/Student.js";
import JobRole from "./../models/JobRole.js";

/**
 * Normalize skill names for reliable comparison.
 */
const normalizeSkill = (skill) => {
    // console.log(String(skill || "")
    //     .trim()
    //     .toLowerCase())
    return String(skill || "")
        .trim()
        .toLowerCase();
};


/**
 * Convert skills into a clean array.
 * Supports:
 * - Arrays of strings
 * - Comma-separated strings
 * - Arrays containing comma-separated strings
 */
const normalizeSkillArray = (skills = []) => {
    if (typeof skills === "string") {
        skills = skills.split(",");
    }

    return skills
        .flatMap((skill) => String(skill).split(","))
        .map((skill) => skill.trim().toLowerCase())
        .filter(Boolean);
};

/**
 * Get skills present in both student and job skill lists.
 */
export const getMatchedSkills = (userSkills, jobSkills) => {
    const userSkillSet = new Set(
        userSkills.map((skill) => normalizeSkill(skill))
    );
    // console.log(userSkills);
    // // console.log(userSkillSet);
    // console.log(jobSkills);
    // console.log(jobSkills.filter((skill) =>
    //     userSkillSet.has(normalizeSkill(skill))
    // ))
    return jobSkills.filter((skill) =>
        userSkillSet.has(normalizeSkill(skill))
    );
};

/**
 * Get required skills missing from the student's skill list.
 */
export const getMissingSkills = (userSkills, requiredSkills) => {
    const userSkillSet = new Set(
        userSkills.map((skill) => normalizeSkill(skill))
    );

    return requiredSkills.filter(
        (skill) => !userSkillSet.has(normalizeSkill(skill))
    );
};

/**
 * Calculate match percentage based on required skills.
 */
export const calculateMatchPercentage = (
    matchedSkills,
    requiredSkills
) => {
    if (!requiredSkills || requiredSkills.length === 0) {
        return 0;
    }

    return Math.round(
        (matchedSkills.length / requiredSkills.length) * 100
    );
};

/**
 * Fetch student profile using user ID.
 */
export const getStudentForMatching = async (userId) => {
    const student = await Student.findOne({
        user: userId,
    });

    return student;
};

/**
 * Fetch job role by role name.
 */
const escapeRegex = (value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const getJobRole = async (role) => {
    const normalizedRole = role.trim();

    const job = await JobRole.findOne({
        job_role: {
            $regex: `^${escapeRegex(normalizedRole)}$`,
            $options: "i",
        },
    });

    return job;
};

/**
 * Match a student against a selected job role.
 */
export const matchStudentToRole = async (userId, role) => {
    const student = await getStudentForMatching(userId);
    
    if (!student) {
        throw new Error("Student profile not found");
    }
    const job = await getJobRole(role);

    if (!job) {
        throw new Error("Job role not found");
    }

    const technicalSkills = normalizeSkillArray(
        student.technical_skills
    );

    const programmingLanguages = normalizeSkillArray(
        student.programming_languages
    );

    const requiredSkills = normalizeSkillArray(
        job.required_skills
    );

    const optionalSkills = normalizeSkillArray(
        job.optional_skills
    );

    const studentSkills = [
        ...new Map(
            [...technicalSkills, ...programmingLanguages].map(
                (skill) => [normalizeSkill(skill), skill]
            )
        ).values(),
    ];

    const matchedSkills = getMatchedSkills(
        studentSkills,
        requiredSkills
    );

    const missingRequiredSkills = getMissingSkills(
        studentSkills,
        requiredSkills
    );

    const missingOptionalSkills = getMissingSkills(
        studentSkills,
        optionalSkills
    );

    const percentage = calculateMatchPercentage(
        matchedSkills,
        requiredSkills
    );

    return {
        role,
        percentage,
        matchedSkills,
        missingRequiredSkills,
        missingOptionalSkills,
        totalRequiredSkills: requiredSkills.length,
        totalMatchedSkills: matchedSkills.length,
        totalMissingRequiredSkills: missingRequiredSkills.length,
    };
};