import nodemailer from "nodemailer"
import { WELCOME_EMAIL_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"
import dotenv from "dotenv"

dotenv.config()

const from = process.env.GMAIL_NAME || ""


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASS
    }
})

const verifyEmailEmail = (toEmail, verificationTokenT, userName) => ({
    from: from,
    to: toEmail,
    subject: "Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationTokenT).replace("{userName}", userName)
})

export const sendVErifyEmail = (toEmail, verificationTokenT, userName) => {
    transporter.sendMail(verifyEmailEmail(toEmail, verificationTokenT, userName), (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

export const welcomeEmail = (toEmail, userName) => ({
    from: from,
    to: toEmail,
    subject: "Welcome to our website",
    html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", userName)
})

export const sendWelcomeEmail = (toEmail, userName) => {
    transporter.sendMail(welcomeEmail(toEmail, userName), (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

const resetPasswordEmail = (toEmail, route, userName) => ({
    from: from,
    to: toEmail,
    subject: "Reset Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{userName}", userName).replace("{resetURL}", route)
})

export const sendPasswordResetEmail = (toEmail, route, userName) => {
    transporter.sendMail(resetPasswordEmail(toEmail, route ,userName), (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

const passwordRestSuccessEmail = (toEmail, userName) => ({
    from: process.env.GMAIL_NAME,
    to: toEmail,
    subject: "Reset Password Succsessful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{userName}", userName)
});

export const sendResetPasswordSuccess = (toEmail, userName) => {
    transporter.sendMail(passwordRestSuccessEmail(toEmail ,userName), (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

