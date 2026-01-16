/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node type
import type {Request, Response} from "express"

// Custom Module
import Logger from "@/lib/Winston.lib"

// Model 
import UserModel from "@/model/UserModel"
import Env from "@/configs/Env.config"

const GetAllUser = async (req:Request, res: Response) =>{
    try{
        const limit = parseInt(req.query.limit as string) || Env.DEFAULT_RES_LIMIT
        const offset = parseInt(req.query.offset as string) || Env.DEFAULT_RES_OFFSET
        const total = await UserModel.countDocuments()

        const listUser = await UserModel.find().select('-__v').skip(offset).limit(limit).lean().exec()

        return res.status(200).json({
            success: true,
            message: "Get All User Success",
            data: listUser,
            total: total
        })
    }catch(error){
        Logger.error('Controller Get All User Error: ', error);
        return res
        .status(500)
        .json({
            code: 'ServerError',
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

export default GetAllUser