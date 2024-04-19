import { NextFunction, Request, RequestHandler, Response } from "express";
import UserApplication from "../model/userApplication ";
import { IReq } from "../utils/interface";

export const createUserApplication = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    console.log(req.user);
    // const newApplicationData = req.body;
    // const newJob = await UserApplication.create({});
    res.status(201).json({ message: "Шинэ ажил нэмлээ" });
  } catch (error) {
    next(error);
  }
};
