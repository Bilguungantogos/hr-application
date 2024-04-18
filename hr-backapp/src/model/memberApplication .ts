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

const memberApplicationsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    track: {
      type: String,
      required: true,
    },
    knowledge: {
      type: String,
      required: true,
    },
    trackReason: {
      type: String,
      required: true,
    },
    otherTrackInterest: {
      type: String,
      required: true,
    },
    otherTrackInterestReason: {
      type: String,
      required: true,
    },
    otherStudentActivites: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    submissionTime: {
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

const memberApplication = model("ApplicationForm", memberApplicationsSchema);

export default memberApplication;
