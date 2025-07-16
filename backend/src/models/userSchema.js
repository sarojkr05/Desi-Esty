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
      match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: true,
      maxLength: [10, "Mobile number must not be more than 10 characters long!"],
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    password: {
      type: String,
      required: true,
      match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, "The password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"]
    },
    role: {
      type: String,
      enum: ["user", "artisan", "admin"],
      default: "user",
    },
    address: {
      type: String
    },
    isApproved: {
      type: Boolean,
      default: false, // for artisans, admin approval needed
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
