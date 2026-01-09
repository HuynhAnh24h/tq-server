/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

import { Router } from "express"

import type { Request, Response } from "express"


const LandingRoute = Router()

LandingRoute.get("/",(req: Request, res: Response) =>{
    try{
        return res.status(200).json({
            success: true,
            message: "API for lading page work"
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Lading page route is error",
            error: error
        })
    }
})


export default LandingRoute
