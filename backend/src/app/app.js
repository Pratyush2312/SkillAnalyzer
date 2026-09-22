import express from 'express';
import authRoute from '../routes/authRoute.js'
import studentRoute from '../routes/studentRoute.js'
import matchingRoute from '../routes/matchingRoute.js'
import roadmapRoute from '../routes/roadmapRoute.js'
import skillGraphRoute from "../routes/skillGraphRoute.js"
import skillGapRoute from "../routes/skillGapRoute.js"
import projectRoute from "../routes/projectRoute.js"
import assessmentRoute from "../routes/assessmentRoute.js"
import certificateRoute from "../routes/certificateRoute.js"
import skillIntelligenceRoute from "../routes/skillIntelligenceRoute.js"
import cors from 'cors'
import cookieParser from 'cookie-parser'
export const app = express();

app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));

app.get('/', (req, res) => { 
    res.send({
        success: true,
        message:"Server Running"
    })
})

app.use(cookieParser())
app.use('/auth', authRoute);
app.use("/api/student", studentRoute);
app.use('/career', matchingRoute);
app.use('/roadmap', roadmapRoute);
app.use("/api/skill-graph", skillGraphRoute);
app.use("/api/skill-gap", skillGapRoute);
app.use("/api/projects", projectRoute);
app.use("/api/assessments", assessmentRoute);
app.use("/api/certificates", certificateRoute);
app.use(
    "/api/skill-intelligence",
    skillIntelligenceRoute
);