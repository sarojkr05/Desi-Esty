import express from "express"
import connectDB from "./src/config/db_config.js";
import serverConfig from "./src/config/serverConfig.js";
import userRouter from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/ping", (req, res) => {
    res.send("Pong")
})

app.use("/auth", userRouter)

app.listen(serverConfig.PORT, () => {
    connectDB();
    console.log(`Server got started on port ${serverConfig.PORT}...`)
})

//db password MuKcXwbUHaDoVN1L
//db username sarojkr05
// Created a new repository on GitHub