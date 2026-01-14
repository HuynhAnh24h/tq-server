/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Custom Module
import Logger from "@/lib/Winston.lib"

// Types
import UserModel from "@/model/UserModel"
import type { Request, Response, NextFunction } from "express"

export type AuthRole = 'admin' | 'manager' | 'content' | 'user'

const Authorize = (roles: AuthRole[]) =>{
    return async (req: Request, res: Response, next: NextFunction)=>{
        const userId = req.userId
        try{
            const user = await UserModel.findById(userId).select('role').exec()
            if(!user){
                return res.status(404).json({
                    code:"NotFound",
                    succes: false,
                    message: 'User Not Found',

                })
            }
            if(!roles.includes(user.role)){
                return res.status(403).json({
                    code: "AuthorizationError",
                    success: false,
                    message: "Access denied, insufficient permissions"
                })
            }
            next()
        }catch(error){
            if(error instanceof Error){
                return res.status(500).json({
                    code: "ServerError",
                    success: false,
                    message: "Internal Server error",
                    error: error.message
                })
            }
            Logger.error("Server Error in Authorize: ", error)
        }
    }
}

export default Authorize