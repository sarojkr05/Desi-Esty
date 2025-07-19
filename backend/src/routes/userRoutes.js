import express from "express";
import { getCurrentUser, login, logout, signup,getUserProfileDetails,updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/profile",  getUserProfileDetails);
userRouter.put("/complete-profile",protect, updateUserProfile); 

// Protected route
userRouter.get("/me",protect, getCurrentUser);
export default userRouter;
