import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "И-мэйл хаяг заавал оруулна уу"],
    },
    password: {
      type: String,
      required: true,
      minlenght: 6,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    otp: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
    console.log(this.password);
  }
  next();
});

const User = model("User", userSchema);

export default User;
