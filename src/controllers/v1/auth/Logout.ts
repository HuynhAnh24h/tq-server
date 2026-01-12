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

const Logout = async (req: Request, res: Response) =>{
    try{

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