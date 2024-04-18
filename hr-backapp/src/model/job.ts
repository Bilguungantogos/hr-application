import { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    jobTitle: { type: String, required: true },
    requirements: {
      purpose: String,
      jobRequirement: String,
      jobType: String,
      employmentType: String,
    },
    location: String,
    field: String,
    deadline: String,
  },
  { timestamps: true, collection: "RecruitmentApplications" }
);

const Job = model("Job", jobSchema);

export default Job;
