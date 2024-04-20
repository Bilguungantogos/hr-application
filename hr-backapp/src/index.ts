import express, { Application } from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleWare/errorHandler";
import auth from "./router/auth";
import job from "./router/job";
import jobApplication from "./router/jobApplication";

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

app.listen(8080, () => {
  console.log("server is running");
});

// AWS.config.update({
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.ACCESS_SECRET_KEY,
//   region: "your_bucket_region",
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./files");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// app.use("/files", express.static("files"));
// app.post(
//   "/upload-files",
//   upload.single("file"),
//   authenticate,
//   async (req: IReq, res: Response) => {
//     try {
//       console.log(req.file);
//       const uploadedCV = await User.updateOne(
//         { _id: req.user._id },
//         {
//           cv: req.file?.filename,
//         }
//       );
//       console.log(uploadedCV, "aaaaa");
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
