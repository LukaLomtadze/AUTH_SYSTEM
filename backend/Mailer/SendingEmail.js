import nodemailer from "noodemailer"
import { WELCOME_EMAIL_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"
import dotenv from "dotenv"

dotenv.config()

