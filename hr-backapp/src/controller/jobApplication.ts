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
    console.log(req.user);

    const existApplication = await UserApplication.findOne({
      user: req.user._id,
    });
    if (!existApplication) {
      const newJob = await UserApplication.create({
        user: req.user._id,
        job: "66212c72d6ef52cd00521b8f",
        generalInfo: {
          aboutMe: "minii tuhai bi bol bilguun",
          firstName: "bilguun",
          lastName: "bilguun",
          passportId: "ukfsdkfjfs",
          birthDate: "20025648",
        },
        contactInfo: {
          phone: "95959595",
          email: "admin@gmail.com",
          address: "bzd ulaanbaatar",
        },
        jobPosition: {
          jobField: "tehnologi",
          salaryExpectation: "15000000",
          employmentType: "ajiltan",
        },
      });
      res.status(201).json({ message: "Шинэ anket нэмлээ", newJob });
      return;
    }

    if (existApplication && existApplication.job.includes(req.body.jobId)) {
      res.status(400).send("Та энэ ажилд анкет илгээсэн байна.");
      return;
    }
    const applyToJob = await UserApplication.updateOne(
      { user: req.user._id },
      { $addToSet: { job: "66212caad6ef52cd00521b91" } }
    );

    res.status(201).json({ message: "Шинэ ажилд анкет явууллаа", applyToJob });
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
