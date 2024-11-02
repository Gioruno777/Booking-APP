import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import UserRoute from "./routes/UserRoute"
import cookieParser from "cookie-parser"

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("Connected to database!"))
    .catch(err => (console.log("Failed to connect to the database!\n", err)))

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })

)

app.use("/api/user/", UserRoute)


app.listen(80, () => {
    console.log('http://127.0.0.1')
})