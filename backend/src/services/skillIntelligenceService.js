import { getSkillGraph } from "./skillService.js";
import { calculateSkillGap } from "./skillGapService.js";

const getEvidenceSources = (evidence = []) => {
    return [
        ...new Set(
            evidence
                .map((item) => item?.type)
                .filter(Boolean)
        ),
    ];
};

const calculateConfidence = (evidence = []) => {
    if (!evidence.length) return 0;

    const sourceWeights = {
        profile: 0.4,
        course: 0.6,
        certificate: 0.7,
        project: 0.8,
        assessment: 0.9,
        experience: 1,
    };

    const weightedConfidence = evidence.reduce(
        (total, item) => {
            return total + (sourceWeights[item.type] || 0.5);
        },
        0
    );

    /*
     * More independent evidence sources increase confidence,
     * but confidence is capped at 100.
     */
    const sourceDiversity = getEvidenceSources(evidence).length;

    const baseConfidence =
        (weightedConfidence / evidence.length) * 100;

    const diversityBonus = Math.min(
        sourceDiversity * 5,
        20
    );

    return Math.round(
        Math.min(100, baseConfidence + diversityBonus)
    );
};

const enrichSkill = (skill) => {
    const evidence = skill.evidence || [];

    const evidenceSources = getEvidenceSources(evidence);

    return {
        ...skill,

        status:
            skill.proficiency >= 70
                ? "strong"
                : skill.proficiency >= 40
                    ? "developing"
                    : "needs-work",

        evidenceSources,

        sourceCount: evidenceSources.length,

        confidence: calculateConfidence(evidence),
    };
};

export const getSkillIntelligence = async (userId, role) => {
    const skillGraph = await getSkillGraph(userId);

    const skills = skillGraph.map(enrichSkill);

    let gap = null;

    if (role) {
        gap = await calculateSkillGap(userId, role);
    }

    const totalSkills = skills.length;

    const strongSkills = skills.filter(
        (skill) => skill.proficiency >= 70
    ).length;

    const developingSkills = skills.filter(
        (skill) =>
            skill.proficiency >= 40 &&
            skill.proficiency < 70
    ).length;

    const weakSkills = skills.filter(
        (skill) => skill.proficiency < 40
    ).length;

    const averageProficiency = totalSkills
        ? Math.round(
            skills.reduce(
                (sum, skill) =>
                    sum + skill.proficiency,
                0
            ) / totalSkills
        )
        : 0;

    const allEvidence = skills.flatMap(
        (skill) => skill.evidence || []
    );

    const evidenceSources = [
        ...new Set(
            allEvidence
                .map((item) => item?.type)
                .filter(Boolean)
        ),
    ];

    const averageConfidence = totalSkills
        ? Math.round(
            skills.reduce(
                (sum, skill) =>
                    sum + skill.confidence,
                0
            ) / totalSkills
        )
        : 0;

    return {
        summary: {
            totalSkills,
            strongSkills,
            developingSkills,
            weakSkills,
            averageProficiency,
            averageConfidence,
            evidenceSources,
            evidenceSourceCount:
                evidenceSources.length,
            totalEvidence: allEvidence.length,
        },

        skills,

        gap,
    };
};