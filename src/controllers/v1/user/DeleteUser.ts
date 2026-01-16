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
import TokenModel from "@/model/TokenModel"

const DeleteUser = async (req:Request, res: Response) =>{
    try{
        const {userIds} = req.body
        if(!Array.isArray(userIds) || userIds.length === 0){
            return res.status(400).json({
                success: false,
                message: "Array list user id is null"
            })
        }

        const result = await UserModel.deleteMany({_id:{ $in: userIds}})
        // Xóa token liên quan 
        const tokenResult = await TokenModel.deleteMany({ userId: { $in: userIds } });

        return res.status(200).json({
            success: true,
            message: "Delete User success",
            deleteCount: result.deletedCount,
        })
    }catch(error){
        Logger.error('Controller Delete User Error: ', error);
        return res
        .status(500)
        .json({
            code: 'ServerError',
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

export default DeleteUser