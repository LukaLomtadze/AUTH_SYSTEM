import express from "express"
import { signUp, logIn, verifyEmail, logOut, forgotPassword, resetPassword, checkAuth } from "../Controller/auth.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router()

router.get("/checkAuth", verifyToken ,checkAuth)

router.post("/signup", signUp)

router.post("/login", logIn)

router.post("/logout", logOut)

router.post("/verify-email", verifyEmail)

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)


export default router;