import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_PRIVATE_KEY as string, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  return token;
};

export default generateToken;
