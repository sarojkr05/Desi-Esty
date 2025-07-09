import express from "express"
import connectDB from "./src/config/db_config.js";
import serverConfig from "./src/config/serverConfig.js";

const app = express();


app.get("/ping", (req, res) => {
    res.send("Pong")
})

app.listen(serverConfig.PORT, () => {
    connectDB();
    console.log(`Server got started on port ${serverConfig.PORT}...`)
})

//db password MuKcXwbUHaDoVN1L
//db username sarojkr05