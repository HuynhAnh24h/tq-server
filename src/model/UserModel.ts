/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
// Node module
import {Schema, model} from "mongoose"
import bcrypt from "bcrypt"

// Type
import type { IUser } from "@/types/auth/UserType"

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
        enum: ["admin","manager","content","user"],
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

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> { 
    return await bcrypt.compare(candidatePassword, this.password) 
}


const UserModel = model<IUser>("User", UserSchema)

export default UserModel