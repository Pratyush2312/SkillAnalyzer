import { app } from "./app/app.js";
import { connectDB } from "./config/db.js";
// import { matchStudentToRole } from "./services/matchingService.js";


await connectDB()
// await matchStudentToRole("6aa17aaec43f8778ed5cdccf", "Data Scientist");

app.listen(3000, ()=> console.log("Server running on 3000"))