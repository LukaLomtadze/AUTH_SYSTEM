import express from "express"
import { signUp, logIn, verifyEmail, logOut, forgotPassword } from "../Controller/auth.controller.js";

const router = express.Router()

// router.get("/checkAuth")

router.post("/signup", signUp)

router.post("/login", logIn)

router.post("logout", logOut)

router.post("/verify-email", verifyEmail)

router.post("/forgot-password", forgotPassword)

// router.post("reset-password/:token")


export default router;