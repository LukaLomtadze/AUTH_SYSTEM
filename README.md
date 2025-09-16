# A Node.js authentication system with email verification, password reset, JWT-based authentication, and secure cookie handling.


## Features

User signup and login with email verification

JWT authentication stored in httpOnly cookies

Password reset via email with expiring tokens

Email notifications for verification, welcome, and password reset

Secure password hashing with bcryptjs

Easy-to-modify email templates using HTML and inline CSS

--------------------------------------------------------------------

## Tech Stack

Node.js & Express.js

MongoDB & Mongoose

JWT for authentication

bcryptjs for password hashing

Nodemailer for sending emails

dotenv for environment variables

cookie-parser for handling cookies

--------------------------------------------------------------------

## Getting Started

Prerequisites

Node.js >= 18

MongoDB database (local or Atlas)

Gmail account for sending emails

--------------------------------------------------------------------

## What to do
All you need to is to create mongoDB database get connection string. In the root of your backend folder create .env file copy and paste all the envirometal variables from up above in that env file.
Change MONGO_URI to connection string you grabbed from mongoDB. Set your email and gmail app password in the envirometal variables and your are all set

--------------------------------------------------------------------

# Installation
## Clone the repository
git clone https://github.com/LukaLomtadze/AUTH_SYSTEM.git

cd project-name

## Install dependencies
npm install

## Start server
npm run dev

--------------------------------------------------------------------

## Environment Variables

PORT=4040

MONGO_URI=your-mongodb-uri

JWT_SECRET=your-jwt-secret

GMAIL_NAME=your-gmail-address

GMAIL_HOST=smtp.gmail.com

GMAIL_PASS=your-gmail-app-password

CLIENT_URL=http://localhost:5173

BACKEND_URL=http://localhost:4040

NODE_ENV=development


--------------------------------------------------------------------


| Method | Route                            | Description                             |
| ------ | -------------------------------- | --------------------------------------- |
| POST   | /api/auth/signup                 | Create a new user                       |
| POST   | /api/auth/login                  | Log in user                             |
| POST   | /api/auth/logout                 | Log out user (clear cookie)             |
| POST   | /api/auth/verify-email           | Verify user email with code             |
| POST   | /api/auth/forgot-password        | Send password reset email               |
| POST   | /api/auth/reset-password/\:token | Reset password using token              |
| GET    | /api/auth/checkAuth              | Check if user is logged in (JWT cookie) |


## Email Templates:

Verification Email: Sends a 6-digit verification code to new users.

Welcome Email: Sent after email verification.

Password Reset Request: Contains a link to reset password.

Password Reset Success: Confirms password has been changed.

All templates are located in Mailer/emailTemplates.js and can be customized easily.

--------------------------------------------------------------------


## Optional: Reusable Notes
You can replace Gmail with any other SMTP provider in Nodemailer.
Use HTTPS in CLIENT_URL for production to avoid Gmail stripping links.
All JWT tokens are stored in httpOnly cookies for security.
Adjust email expiration times, password policies, and token lifetimes as needed.



























