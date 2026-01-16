/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node type
import type {Request, Response} from "express"
import { Types } from "mongoose"

// Custom Module
import Logger from "@/lib/Winston.lib"

// Model 
import UserModel from "@/model/UserModel"
import TokenModel from "@/model/TokenModel"

const GetOneUser = async (req: Request, res: Response) =>{
    try{    
        const userId = req.params.userId 

        const user = await UserModel.findById(userId).select('-__v').exec()
        if(!user){
            return res.status(404).json({
                code: "NotFound",
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Get one user success",
            data: user
        })

    }catch(error){
         Logger.error('Controller Get One User Error: ', error);
            return res
            .status(500)
            .json({
                code: 'ServerError',
                message: 'Server error',
                error: error instanceof Error ? error.message : String(error),
            });
    }
}

export default GetOneUser