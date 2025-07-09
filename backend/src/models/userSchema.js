import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "artisan", "admin"],
      default: "user",
    },
    isApproved: {
      type: Boolean,
      default: false, // for artisans, admin approval needed
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
