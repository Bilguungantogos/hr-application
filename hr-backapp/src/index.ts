import express, { Application } from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleWare/errorHandler";
import auth from "./router/auth";
import job from "./router/job";
import jobApplication from "./router/jobApplication";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const app: Application = express();

connectDB(MONGO_URI);

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/job", job);
app.use("/application", jobApplication);
app.use(errorHandler);

app.listen(8080, () => {
  console.log("server is running");
});
