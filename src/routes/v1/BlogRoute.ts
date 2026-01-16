/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

import CreateBlogCategory from "@/controllers/v1/Blog/CreateBlogCategory"
import Authenticate from "@/middlewares/Auth/AuthenticateMiddleware"
import Authorize from "@/middlewares/Auth/AuthorizeMiddleware"
import { Router } from "express"

import type {Request, Response} from "express"

const BlogRouter = Router()

BlogRouter.get('/',(req: Request,res: Response)=>{
    try{
        return res.status(200).json({
            success: true,
            message: "Route Blog API Work"
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Route Blog is Error",
            error: error
        })
    }
})

BlogRouter.post('/create-blog-category', Authenticate, Authorize(['admin','manager','content']), CreateBlogCategory)


export default BlogRouter