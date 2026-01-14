/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Custom module
import Logger from "@/lib/Winston.lib"
import Env from "@/configs/Env.config"

//Models
import TokenModel from "@/model/TokenModel"

// Types
import type { Request, Response } from "express"
import { Types } from "mongoose"


const Logout = async (req: Request, res: Response) =>{
    try{
        const refreshToken = req.cookies.refreshToken as string
        if(refreshToken){
            await TokenModel.deleteOne({token: refreshToken})
            Logger.info("User refresh token deleted success",{
                userId: req.userId as Types.ObjectId,
                token: refreshToken
            })
            res.clearCookie('refreshToken',{
                httpOnly: true,
                secure: Env.NODE_ENV === 'production',
                sameSite: 'strict'
            })
        }
        res.sendStatus(204)
        Logger.info('User logout success',{
            userId: req.userId as Types.ObjectId
        })

    }catch(error){
        Logger.error('Error during user Logout: ', error)
        return res.status(500).json({
            code: "ServerError",
            message: "Internal server error",
            error: error
        })
    }
}

export default Logout