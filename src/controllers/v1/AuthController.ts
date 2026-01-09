/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
// Types
import type { Request, Response } from "express"

// Custom module


const AuthController = {
    // Register
    Register: async (req: Request, res: Response) =>{
        try{
            res.status(200).json({
                success: true,
                message: "Controller Register Work"
            })
        }catch(error){
            res.status(500).json({
                success: false,
                message: "Controller Register faild",
                error: error
            })
        }
    },

    // Login
    Login: async (req: Request, res: Response) =>{
        try{
            res.status(200).json({
                success: true,
                message: "Controller Login Work"
            })
        }catch(error){
            res.status(500).json({
                success: false,
                message: "Controller Login faild",
                error: error
            })
        }
    },
}

export default AuthController