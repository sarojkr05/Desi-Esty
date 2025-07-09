import express from "express"

const app = express();


app.get("/ping", (req, res) => {
    res.send("Pong")
})

app.listen("5000", () => {
    console.log("The server got started at 5000 PORT ")
})