/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

import { Router } from "express"
import type { Request, Response } from "express"


const ProductRoute = Router()

ProductRoute.get('/', (req: Request, res: Response)=>{
    try{
        return res.status(200).json({
            success: true,
            message: "Product route Api work"
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Product route error",
            error: error
        })
    }
})



export default ProductRoute
