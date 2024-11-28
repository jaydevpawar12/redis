const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors");
const { redis } = require("./config/redis");
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());

redis.on('connect', () => {
    console.log("Connected to Redis");
})

app.use("/api", require("./route/todoRoute"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource NOT Found" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Server Error", error: err.message })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})
