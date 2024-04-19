import { Router } from "express";
import { createUserApplication } from "../controller/jobApplication";
import { authenticate } from "../middleWare/auth";

const router = Router();

router.route("/").post(authenticate, createUserApplication);

export default router;
