import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";

import Student from "../src/models/Student.js";
import JobRole from "../src/models/JobRole.js";

dotenv.config();

const seedDatabase = async () => {
    console.log(process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("MongoDB connected");

        const students = JSON.parse(
            fs.readFileSync(
                "C:\\Users\\PRATYUSH\\Desktop\\Coding\\SIH\\data\\cleaned_students.json",
                "utf-8"
            )
        );

        const jobRoles = JSON.parse(
            fs.readFileSync(
                "C:\\Users\\PRATYUSH\\Desktop\\Coding\\SIH\\data\\cleaned_job_roles.json",
                "utf-8"
            )
        );

  
        await Student.deleteMany({});
        await JobRole.deleteMany({});

        console.log("Old data cleared");
     

        // await Student.insertMany(students);


        // await JobRole.insertMany(jobRoles);

        console.log(`${students.length} students inserted`);
        console.log(`${jobRoles.length} job roles inserted`);

        

        console.log("Database seeding completed!");
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
};

seedDatabase();