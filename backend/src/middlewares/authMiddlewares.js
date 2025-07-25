import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const protect = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    


    next();
    console.log("Fetched user:", req.user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
