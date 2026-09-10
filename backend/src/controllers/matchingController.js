import { matchStudentToRole } from "../services/matchingService.js";

export const matchRole = async (req, res) => {
    try {
        const data = await matchStudentToRole(req.user._id, req.body.role);
        return res.status(200).json({
            message: "User matching Result",
            data:data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }    
}