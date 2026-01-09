/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
// Node module
import {Schema, model} from "mongoose"

// Type
import type { IUser } from "@/@types/auth/UserType"

const UserSchema = new Schema<IUser>({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin","manager","user"],
        default: "user"
    },
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    socialLinks:{
        facebook: String,
        instagram: String,
        twitter: String,
        tiktok: String
    }
}, {timestamps: true})

const UserModel = model<IUser>("User", UserSchema)

export default UserModel