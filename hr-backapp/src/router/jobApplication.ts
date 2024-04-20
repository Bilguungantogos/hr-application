import { Router } from "express";
import {
  createUserApplication,
  getAllUserApplication,
  getUserApplication,
} from "../controller/jobApplication";
import { authenticate, authorize } from "../middleWare/auth";

const router = Router();

router
  .route("/")
  .post(authenticate, createUserApplication)
  .get(authenticate, getUserApplication);

router
  .route("/admin")
  .get(authenticate, authorize("Admin"), getAllUserApplication);

export default router;
