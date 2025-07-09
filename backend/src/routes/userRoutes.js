import express from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

// 🔒 Protected route
userRouter.get("/me", protect, getCurrentUser);
export default userRouter;
