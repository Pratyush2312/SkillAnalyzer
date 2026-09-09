import express from 'express';
import authRoute from '../routes/authRoute.js'
import studentRoute from '../routes/studentRoute.js'
export const app = express();

app.use(express.json());

app.use('/auth', authRoute);
app.use("/api/student", studentRoute);

