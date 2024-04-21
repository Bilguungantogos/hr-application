import { NextFunction, Request, RequestHandler, Response } from "express";
import { IReq } from "../utils/interface";
import UserApplication from "../model/userApplication ";
import User from "../model/user";

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

    const updateApplication = await UserApplication.updateOne(
      {
        user: req.user._id,
      },
      {
        $addToSet: { job: jobId },
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
      }
    );

    res
      .status(201)
      .json({ message: "Шинэ ажилд анкет явууллаа", updateApplication });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const updateUserApplication = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body.applicationForm;
    const updateApplication = await UserApplication.updateOne(
      {
        user: req.user._id,
      },
      {
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
      }
    );

    res
      .status(201)
      .json({ message: "Шинэ ажилд анкет явууллаа", updateApplication });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const getUserApplication = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const userApp = await UserApplication.findOne({
      user: req.user._id,
    }).populate("user");

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
    const allUserApp = await UserApplication.find().populate("user");
    res
      .status(201)
      .json({ message: "Хэрэглэгчийн бүх анкет авлаа.", allUserApp });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUser = await User.find();
    res
      .status(201)
      .json({ message: "Бүх хэрэглэгчийн мэдээлэл авлаа.", allUser });
  } catch (error) {
    next(error);
  }
};
