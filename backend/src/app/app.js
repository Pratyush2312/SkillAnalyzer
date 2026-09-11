import express from 'express';
import authRoute from '../routes/authRoute.js'
import studentRoute from '../routes/studentRoute.js'
import matchingRoute from '../routes/matchingRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
export const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));
app.use(cookieParser())
app.use('/auth', authRoute);
app.use("/api/student", studentRoute);
app.use('/match', matchingRoute);
