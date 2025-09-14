import mongoose, {mongo} from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    lastLogin:{
        type: Date,
        default: Date.now
    },
    isVerfied:{
        type: Boolean,
        default: false,
    },
    has2Step:{
        type: Boolean,
        default: false,
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User;