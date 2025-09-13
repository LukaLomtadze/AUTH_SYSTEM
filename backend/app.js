import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./DB/connectDB.js"
import authRoutes from "./Routes/auth.route.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 4040

app.listen(PORT, () => {
    connectDB()
    console.log("Server started on localhost:"+PORT)
})
