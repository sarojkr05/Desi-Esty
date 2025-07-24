import { loginUser, registerUser } from "../services/userService.js";
import User from "../models/userSchema.js";


export const signup = async (req, res) => {
  try {
    const { name, email, password, mobileNumber, role } = req.body;

    if (!name || !email || !password || !mobileNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser({
      name,
      email,
      password,
      mobileNumber,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const { user, token } = await loginUser({ email, password });

    // Set token in HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // send over HTTPS only in prod
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "You've been successfully logged in!",
        user,
        token,
      });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiry to past date
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "You've been successfully logged out!" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfileDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      _id,
      name,
      email,
      mobileNumber,
      address,
      city,
      state,
      country,
    } = user;

    res.status(200).json({
      id: _id,
      name,
      email,
      mobileNumber,
      address,
      city,
      state,
      country,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mobileNumber, address, city, state, country } = req.body;

 

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        mobileNumber,
        address,
        city,
        state,
        country,
        isProfileComplete: true,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: "Server error: Unable to update profile" });
  }
};
