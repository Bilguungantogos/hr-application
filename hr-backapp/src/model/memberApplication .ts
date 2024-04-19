import { Schema, model } from "mongoose";

const editSubSchema = new Schema(
  {
    editedBy: {
      type: String,
      required: true,
    },
    editTime: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ApplicationsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },
    ],
    generalInfo: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      passportId: {
        type: String,
        required: true,
      },
      birthDate: {
        type: String,
        required: true,
      },
    },
    contactInfo: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    jobPosition: {
      jobField: {
        type: String,
        required: true,
      },
      salaryExpectation: {
        type: String,
        required: true,
      },
      employmentType: {
        type: String,
        required: true,
      },
    },
    cv: {
      type: String,
      required: true,
    },
    edits: {
      type: [editSubSchema],
      required: false,
    },
  },
  { timestamps: true, collection: "RecruitmentApplications" }
);

const memberApplication = model("ApplicationForm", ApplicationsSchema);

export default memberApplication;
