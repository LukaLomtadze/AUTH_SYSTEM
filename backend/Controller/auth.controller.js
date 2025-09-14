import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../Utils/generateTokenAndSetCookie.js";
import mongoose from "mongoose";
import { sendPasswordResetEmail, sendVErifyEmail, sendWelcomeEmail } from "../Mailer/SendingEmail.js";
import crypto from "crypto"


export const signUp = async(req, res) => {
    const {email, name, password} = req.body;

    try{
        if(!email || !name || !password){
            return res.status(401).json({sucess:false, message: "All the fields are required"})
        }

        const userAlreadyExists = await User.findOne({email})
        if(userAlreadyExists){
            return res.status(401).json({sucess:false, message: "User with that email address already exists"})
        }

        const hashsedPassword = await bcrypt.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const newUser = new User({
            email,
            name,
            password: hashsedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 saatshi
        })

        await newUser.save()
        generateTokenAndSetCookie(res, newUser._id)

        try {
            await sendVErifyEmail(email, verificationToken, name)
        } catch (error) {
            console.error("Email sending failed:", emailErr);
        }

        res.status(200).json(
            {   
                sucess: true, 
                message: "User Created Succesfully",
                user: {
                    ...newUser._doc,
                    password: undefined
                }
            })
    }catch(error){
        console.error("Error signing up", error)
        res.status(500).json({
            sucess:false,
            message: "Server Error: " + error
        })
    }
}

export const verifyEmail = async(req, res) => {
    const {code} = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })

        if(!user){
            return res.status(401).json({sucess:false, message: "Invalid or Expired Verification Code"})
        }

        user.isVerfied = true,
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()

        try {
            sendWelcomeEmail(user.email, user.name)
        } catch (error) {
            console.error("Email sending failed:", emailErr);
        }

        res.status(200).json({
            sucess: true,
            message: "Email Verified Successfully",
        })

    } catch (error) {
        console.error("Error signing up", error)
        res.status(500).json({
            sucess:false,
            message: "Server Error: " + error
        })
    }
}

export const logIn = async(req, res) => {
    const {email, password} = req.body;
    try{

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json("User Not Found")
        }

        if(!user.isVerfied){
            return res.status(400).json({sucess: false, message: "Please verify your email first"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.save(401).json({sucess: false, message: "Invalid Password"})
        }

        generateTokenAndSetCookie(res, user._id)

        res.status(200).json({
            sucess: true,
            message: "Logged in Successfully",
            user:{
                ...user._doc,
                password: undefined
            }
        })
    }catch(error){
        console.error("Error signing up", error)
        res.status(500).json({
            sucess:false,
            message: "Server Error: " + error
        })
    }
}

export const logOut = async(req,res) => {
    try{
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 //7dge
        })

        res.status(200).json({sucess: true, message: "Logged Out Successfully"})
    }catch(error){
        console.error("Error signing up", error)
        res.status(500).json({
            sucess:false,
            message: "Server Error: " + error
        })
    }
}

export const checkAuth = async (req, res) => {
    try {
        if(!req.userId)   {
            return res.status(400).json({sucess:false, message: "Unauthorized - No Token Provided"})
        }

        const user = await User.findById(req.userId).select("-password")

        if(!user){
            return res.status(404).json({sucess:false, message: "User Not Found"})
        }

        return res.status(200).json({sucess: true, user})
    } catch (error) {
        console.error("Error signing up", error)
        res.status(500).json({
            sucess:false,
            message: "Server Error: " + error
        })
    }
}

export const forgotPassword = async(req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({sucess: false, message: "User with that email doesn't exists"})
        }

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 + 60 * 60 * 1000 // 1 saati

        user.resetToken = resetToken;
        user.resetTokenExpiresAt = resetTokenExpiresAt;

        await user.save()

        sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`, user.name)

        res.status(200).json({sucess:true, message: "Password reset request sent to your email"})
    } catch (error) {
        console.error("Error signing up", error)
        res.status(500).json({
            sucess:false,
            message: "Server Error: " + error
        })
    }
}