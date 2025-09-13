import express from "express"
import { signUp, logIn, verifyEmail } from "../Controller/auth.controller.js";

const router = express.Router()

// router.get("/checkAuth")

router.post("/signup", signUp)

router.post("/login", logIn)

// router.post("logout")

router.post("/verify-email", verifyEmail)

// router.post("forgot-password")

// router.post("reset-password/:token")


export default router;