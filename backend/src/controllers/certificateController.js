import {
    createCertificate,
    getUserCertificates,
} from "../services/certificateService.js";

export const addCertificate = async (req, res) => {
    try {
        const certificate = await createCertificate(
            req.user._id,
            req.body
        );

        res.status(201).json({
            success: true,
            certificate,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create certificate",
            error: error.message,
        });
    }
};

export const getCertificates = async (req, res) => {
    try {
        const certificates = await getUserCertificates(
            req.user._id
        );

        res.json({
            success: true,
            certificates,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch certificates",
        });
    }
};