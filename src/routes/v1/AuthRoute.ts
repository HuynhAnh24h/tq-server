/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node Module
import { Router } from "express"
import type { Request, Response } from "express"

// Controller
import AuthController from "@/controllers/v1/AuthController"

// Middleware

const AuthRoutes = Router()


AuthRoutes.get('/',(req: Request,res:Response)=>{
    try{
        return res.status(200).json({
            success : true,
            message: "Route Auth Work"
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Route Auth not work",
            error: error
        })
    }
})

AuthRoutes.post('/register', AuthController.Register)
AuthRoutes.post('/login', AuthController.Login)

export default AuthRoutes