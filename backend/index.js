import express from "express"
import connectDB from "./src/config/db_config.js";
import serverConfig from "./src/config/serverConfig.js";
import userRouter from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
import adminRouter from "./src/routes/adminRoutes.js";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();


import productRouter from "./src/routes/productRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// handle cors origin here

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true // Allow credentials to be sent with requests
}));

app.get("/ping", (req, res) => {
    res.send("Pong")
})

app.use("/auth", userRouter)
app.use("/admin", adminRouter);
app.use("/products", productRouter);

app.listen(process.env.PORT, () => {
    connectDB();

    console.log(`Server got started on port ${serverConfig.PORT}...`)
})

//db password MuKcXwbUHaDoVN1L
//db username sarojkr05
// Created a new repository on GitHub