const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path')
const cookieParser = require("cookie-parser")
require("dotenv").config()
const { app, httpServer } = require("./socket/socket")

// const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.NODE_ENV === 'development'
        ? process.env.LOCAL_URL
        : process.env.LIVE_URL,
    credentials: true
}))

app.use(express.static("dist"))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", require("./routes/admin.routes"))
app.use("/api/agency", require("./routes/agency.routes"))
app.use("/api/customer", require("./routes/customer.routes"))
app.use("/api/professional", require("./routes/professionals.routes"))
app.use("/api/services", require("./routes/services.routes"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    // res.status(404).json({ message: "Route Not FOund" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: `SERVER ERROR ${err.message}` })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNCETED 🥭")
    httpServer.listen(process.env.PORT || 5000, console.log("Server Running 🏃‍♀️"))
})