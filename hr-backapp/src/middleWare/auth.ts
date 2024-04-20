import { Response, NextFunction } from "express";

import verifyToken from "../utils/verifyToken";
import User from "../model/user";
import { IReq } from "../utils/interface";

export const authenticate = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Энэ үйлдлийг хийхийн тулд нэвтрэх ёстой" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    console.log("Token-null", token);
    res
      .status(401)
      .json({ message: "Энэ үйлдлийг хийхийн тулд нэвтрэх ёстой" });
  } else {
    const { userId } = verifyToken(token) as { userId: string };
    const findUser = await User.findById(userId).lean();
    req.user = findUser!;
    next();
  }
};

export const authorize = (...roles: string[]) => {
  return (req: IReq, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      if (!roles.includes(user.role)) {
        res.status(403).send("erhgui baina");
      }
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  };
};
