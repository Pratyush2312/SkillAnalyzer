import Roadmap from "../models/RoadMap.js";
import { getPersonalizedRoadmap } from "../services/personalizedRoadmapService.js";
// Get all roadmaps
export const getAllRoadmaps = async (req, res) => {
    try {
        const roadmaps = await Roadmap.find();

        res.status(200).json({
            success: true,
            count: roadmaps.length,
            roadmaps,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch roadmaps",
            error: error.message,
        });
    }
};

export const getRoadmapById = async (req, res) => {
    try {
        const roadmap = await Roadmap.findById(req.params.id);

        if (!roadmap) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found",
            });
        }

        res.status(200).json({
            success: true,
            roadmap,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch roadmap",
            error: error.message,
        });
    }
};


export const getRoadmapsByRole = async (req, res) => {
    try {
        const { role } = req.params;

        const roadmaps = await Roadmap.find({
            career: role,
        }).sort({ order: 1 });

        if (!roadmaps) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found",
            });
        }

        res.status(200).json({
            success: true,
            roadmaps,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch roadmap by role",
            error: error.message,
        });
    }
};


export const getPersonalizedRoadmapController = async (req, res) => {
    try {
        const { role } = req.query;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required",
            });
        }

        const roadmap = await getPersonalizedRoadmap(
            req.user._id,
            role
        );

        res.status(200).json({
            success: true,
            data: roadmap,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate personalized roadmap",
            error: error.message,
        });
    }
};