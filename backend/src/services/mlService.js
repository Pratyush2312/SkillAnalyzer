import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

export async function getCareerRecommendations(studentProfile) {
    try {
        const response = await axios.post(
            `${ML_SERVICE_URL}/predict`,
            {
                technical_skills: studentProfile.technical_skills,
                programming_languages: studentProfile.programming_languages,
                technical_rating: studentProfile.technical_rating,
                soft_skills: studentProfile.soft_skills,
                soft_skill_rating: studentProfile.soft_skill_rating,
                projects: studentProfile.projects,
                project_count: studentProfile.project_count,
                year: studentProfile.year,
                current_course: studentProfile.current_course,
            },
            {
                timeout: 15000,
            }
        );

        return response.data.recommendations;
    } catch (error) {
        console.error(
            "ML service error:",
            error.response?.data || error.message
        );

        throw new Error("Unable to generate career recommendations");
    }
}