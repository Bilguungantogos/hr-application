import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken";
import User from "../model/user";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { userEmail, userPassword } = req.body;

  try {
    const existUser = await User.findOne({ email: userEmail })
      .select("+password")
      .lean();

    if (!existUser)
      return res.status(400).json({ message: `${userEmail} is not exist` });

    const isValid = await bcrypt.compare(
      userPassword,
      existUser.password as string
    );

    if (!isValid)
      return res
        .status(400)
        .json({ message: `Email or password is incorrect` });

    const token = generateToken(existUser._id.toString());
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .json({
        message: "success",
        user: existUser,
        token,
      });
  } catch (error: any) {
    res.status(500).json({ message: `${error.message}` });
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body;
    const user = await User.create({ ...newUser });
    const verifyToken = jwt.sign(
      { email: user.email },
      process.env.JWT_PRIVATE_KEY as string,
      { expiresIn: process.env.JWT_EXPIRE_IN }
    );
    res
      .status(201)
      .json({ message: "шинэ хэрэглэгч үүслээ.", user, token: verifyToken });
  } catch (error) {
    res
      .status(400)
      .json({ message: "шинэ хэрэглэгч бүртгэхэд алдаа гарлаа" + error });
  }
};
