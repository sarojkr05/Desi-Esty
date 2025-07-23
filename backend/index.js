import express from "express"
import connectDB from "./src/config/db_config.js";
import serverConfig from "./src/config/serverConfig.js";
import userRouter from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
import adminRouter from "./src/routes/adminRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import getAllApprovedProducts from "./src/routes/productRuoutesFromUser.js";
import productRouter from "./src/routes/productRoutes.js";


import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// handle cors origin here
console.log("CORS Origin set to:", process.env.FRONTEND_URL);
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));



app.get("/ping", (req, res) => {
    res.send("Pong")
})

app.use("/auth", userRouter)
app.use("/admin", adminRouter);
app.use("/products", productRouter); 
app.use("/product", getAllApprovedProducts); 
app.use("/cart",  cartRouter);




app.listen(process.env.PORT, () => {
    connectDB();

    console.log(`Server got started on port ${serverConfig.PORT}...`)
})

//db password MuKcXwbUHaDoVN1L
//db username sarojkr05
// Created a new repository on GitHub
//pkd22cs059
//NvVh7VmDJQK7r4uu