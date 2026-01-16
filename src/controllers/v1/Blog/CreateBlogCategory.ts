/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Type for Nodemodule
import type { Request, Response } from "express"

// Custom module
import Logger from "@/lib/Winston.lib"

// Model
import BlogCategoryModel from "@/model/BlogCategoryModel"
import { IBlogCategory } from "@/types/blog/BlogType"
import { genSlug } from "@/utils"

// Schema

const CreateBlogCategory = async (req: Request, res: Response)=>{
    try{
        const {title} = req.body as IBlogCategory
        const GenerSlug = await genSlug(title)
        return res.status(200).json({
            success: true,
            message: "Create blog success",
            GenerSlug
        })
    }catch(error){
        Logger.error('Controller Create Blog Error: ', error);
        return res
        .status(500)
        .json({
            code: 'ServerError',
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

export default CreateBlogCategory