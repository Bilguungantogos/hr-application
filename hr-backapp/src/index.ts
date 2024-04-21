import express, { Application, Response } from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleWare/errorHandler";
import auth from "./router/auth";
import job from "./router/job";
import jobApplication from "./router/jobApplication";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import { authenticate } from "./middleWare/auth";
import { IReq } from "./utils/interface";
import User from "./model/user";
import { S3Client } from "@aws-sdk/client-s3";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const app: Application = express();

connectDB(MONGO_URI);

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/job", job);
app.use("/application", jobApplication);
app.use(errorHandler);

const s3Config = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.ACCESS_SECRET_KEY as string,
  },
});
const myBucket = process.env.AWS_BUCKET_NAME as string;

const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: myBucket,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post(
  "/upload-files",
  upload.single("file"),
  authenticate,
  async (req: IReq, res: Response) => {
    try {
      console.log(req.file, "reqfile");
      const uploadedCV = await User.updateOne(
        { _id: req.user._id },
        {
          cv: (req.file as CustomFile)?.location,
        }
      );
      res.send({ uploadedCV, message: "uploaded cv" });
    } catch (error) {
      res.send({ error, message: "error" });
    }
  }
);

app.listen(8080, () => {
  console.log("server is running");
});

interface CustomFile extends Express.Multer.File {
  location: string;
}
