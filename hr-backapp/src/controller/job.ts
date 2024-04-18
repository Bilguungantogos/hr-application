import { NextFunction, Request, RequestHandler, Response } from "express";
import Job from "../model/job";

export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allJobs = await Job.find();
    res.status(201).json({ message: "Бүх ажлын байр олдлоо", allJobs });
  } catch (error) {
    console.log(error);
  }
};

export const createJob = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const newJobData = req.body;
    const newJob = await Job.create({
      jobTitle: newJobData.jobTitle,
      requirements: {
        purpose: newJobData.purpose,
        jobRequirement: newJobData.jobRequirement,
        jobType: newJobData.jobType,
        employmentType: newJobData.employmentType,
      },
      location: newJobData.location,
      field: newJobData.field,
      deadline: newJobData.deadline,
    });
    res.status(201).json({ message: "Шинэ ажил нэмлээ", newJob });
  } catch (error) {
    next(error);
  }
};
