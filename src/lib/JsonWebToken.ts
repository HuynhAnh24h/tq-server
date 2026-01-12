/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node module
import jwt from "jsonwebtoken"

// Custom module
import Env from "@/configs/Env.config"

// Types 
import {Types} from "mongoose"


export const GenerateAccessToken = (userId: Types.ObjectId):string=>{
    return jwt.sign({userId}, Env.ACCESS_TOKEN, {
        expiresIn: Env.ACCESS_TOKEN_EXPIRE,
        subject: 'access-Token-API'
    })
}   

export const GenerateRefreshToken = (userId: Types.ObjectId):string =>{
    return jwt.sign({userId}, Env.REFRESH_TOKEN,{
        expiresIn: Env.REFRESH_TOKEN_EXPIRE,
        subject: 'refresh-Token-API'
    })
}

export const VerifyAccessToken = (token: string) =>{
    return jwt.verify(token, Env.REFRESH_TOKEN)
}