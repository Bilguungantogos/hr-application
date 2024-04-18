import { Router } from "express";
import { createJob, getAllJobs } from "../controller/job";

const router = Router();

router.route("/").get(getAllJobs).post(createJob);

export default router;
