/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node module
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken" 

// Custom modules
import Logger from "@/lib/Winston.lib"
import { VerifyAccessToken, GenerateAccessToken } from "@/lib/JsonWebToken"

// Model
import TokenModel from "@/model/TokenModel"

// Types
import type { Request, Response } from "express"
import { Types } from "mongoose"

const RefreshToken = async (req: Request, res: Response) =>{
    const refreshToken = req.cookies.refreshToken as string
    try{
        const tokenExists = await TokenModel.exists({token: refreshToken})
        if(!tokenExists){
            res.status(401).json({
                code: "AuthenticationError",
                message: "invalid refresh token"
            })
            return
        }
        // Verify Refresh Token
        const jwtPayload = VerifyAccessToken(refreshToken) as {userId: Types.ObjectId}
        const accessToken = GenerateAccessToken(jwtPayload.userId)
        return res.status(200).json({
            accessToken
        })
    }catch(error){
        if(error instanceof TokenExpiredError){
            return res.status(401).json({
                code: 'AuthenticationError',
                message: 'Refresh token expried, please login again'
            })
        }
        if( error instanceof JsonWebTokenError){
            return res.status(401).json({
                code: 'AuthenticationError',
                message: 'Invalid refresh token'
            })
        }
        Logger.error("Error during refresh token: ", error)
        return res.status(500).json({
            code: "ServerError",
            message: "Internal server error",
            error: error
        })
    }
}

export default RefreshToken