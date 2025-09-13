import mongoose from "mongoose";
import dotenv from "dotenv"

export const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connect.connection.host}`)
    }catch(error){
        console.log(`Error connecting to database: ${error}`)
        process.exit(1)
    }
}