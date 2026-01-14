/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node Module
import { Router } from "express"

// Types
import type { Request, Response } from "express"

// Controller
import Register from "@/controllers/v1/auth/Register"
import Login from "@/controllers/v1/auth/Login"
import RefreshToken from "@/controllers/v1/auth/RefreshToken"
import Logout from "@/controllers/v1/auth/Logout"

// Middleware
import ValidationError from "@/middlewares/ValidateMiddleware"
import Authenticate from "@/middlewares/Auth/AuthenticateMiddleware"

// Validate
import { LoginValidateSchema, RefreshTokenValidateSchema, RegisterValidateSchema } from "@/validator/UserValidator"


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

AuthRoutes.post('/register', RegisterValidateSchema , ValidationError , Register)
AuthRoutes.post('/login',LoginValidateSchema, ValidationError, Login) 
AuthRoutes.post('/refresh-token',RefreshTokenValidateSchema, ValidationError,RefreshToken)
AuthRoutes.get('/logout',Authenticate,Logout)

export default AuthRoutes