/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

import { Router } from "express"

import type { Request, Response } from "express"

const DashboardRoute = Router()


DashboardRoute.get('/', (req: Request, res: Response)=>{
    try{
        return res.status(200).json({
            success: true,
            message: "Dashboard Route is work",
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error dashboard API",
            error: error
        })
    }
})




export default DashboardRoute