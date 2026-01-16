import { Types } from "mongoose"
export interface IBlog {
    title: string
    slug: string
    content: string
    banner:{
        publicId: string,
        url:string,
        width: string,
        height: string
    }
    category: Types.ObjectId
    viewsCount: number
    likeCount: number
    commentCount: number
    status: "draft" | "published" 
}

export interface IBlogCategory{
    title: string
    slug: string
    banner: {
        publicId: string,
        url: string,
        width: string,
        height: string
    }
}