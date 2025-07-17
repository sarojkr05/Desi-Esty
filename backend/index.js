import express from "express"
import connectDB from "./src/config/db_config.js";
import serverConfig from "./src/config/serverConfig.js";
import userRouter from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
import adminRouter from "./src/routes/adminRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";

import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();
import productRouter from "./src/routes/productRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// handle cors origin here
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));



app.get("/ping", (req, res) => {
    res.send("Pong")
})

app.use("/auth", userRouter)
app.use("/admin", adminRouter);
app.use("/products", productRouter);
<<<<<<< HEAD
app.use("/cart",cartRouter);
=======
app.use("/cart", cartRouter);

>>>>>>> 6ca8d09764ff70d86a1cc8be3fa2caf2e96b7760

app.listen(process.env.PORT, () => {
    connectDB();

    console.log(`Server got started on port ${serverConfig.PORT}...`)
})

//db password MuKcXwbUHaDoVN1L
//db username sarojkr05
// Created a new repository on GitHub
//pkd22cs059
//NvVh7VmDJQK7r4uu