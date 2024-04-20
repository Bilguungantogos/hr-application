import { NextFunction, Request, RequestHandler, Response } from "express";
import { IReq } from "../utils/interface";
import UserApplication from "../model/userApplication ";

export const createUserApplication = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const data = req.body.applicationForm;
    const jobId = req.body.selectedJobId;

    const existApplication = await UserApplication.findOne({
      user: req.user._id,
    });
    if (!existApplication) {
      const newJob = await UserApplication.create({
        user: req.user._id,
        job: jobId,
        generalInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          passportId: data.passportId,
          birthDate: data.birthDate,
        },
        contactInfo: {
          phone: data.phone,
          email: req.user.email,
          address: data.address,
        },
        jobPosition: {
          jobField: data.jobField,
          salaryExpectation: data.salaryExpectation,
          employmentType: data.employmentType,
        },
      });
      res.status(201).json({ message: "Шинэ anket нэмлээ", newJob });
      return;
    }

    // if (existApplication && existApplication.job.includes(jobId)) {
    //   res.status(400).send("Та энэ ажилд анкет илгээсэн байна.");
    //   return;
    // }
    // const applyToJob = await UserApplication.updateOne(
    //   { user: req.user._id },
    //   { $addToSet: { job: jobId } }
    // );

    res.status(201).json({ message: "Шинэ ажилд анкет явууллаа" });
  } catch (error) {
    next(error);
  }
};

export const getUserApplication = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const userApp = await UserApplication.findOne({ user: req.user._id });

    res.status(201).json({ message: "Хэрэглэгчийн анкет авлаа.", userApp });
  } catch (error) {
    next(error);
  }
};

export const getAllUserApplication = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUserApp = await UserApplication.find();
    res
      .status(201)
      .json({ message: "Хэрэглэгчийн бүх анкет авлаа.", allUserApp });
  } catch (error) {
    next(error);
  }
};
