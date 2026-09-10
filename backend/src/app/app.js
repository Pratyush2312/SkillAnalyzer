import express from 'express';
import authRoute from '../routes/authRoute.js'
import studentRoute from '../routes/studentRoute.js'
import matchingRoute from '../routes/matchingRoute.js'
export const app = express();

app.use(express.json());

app.use('/auth', authRoute);
app.use("/api/student", studentRoute);
app.use('/match', matchingRoute);
