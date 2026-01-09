/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
// Node module
import {z} from "zod"

export const UserSchema = z.object({
    username: z.string().min(3,"Username musbe lest than 3 character"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(6,"Password phải có ít nhất 6 ký tự"),
    role: z.enum(["admin","manager","user"]),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    socicalLinks: z.object({
        facebook:z.string().url().optional(),
        instagram: z.string().url().optional(),
        twitter: z.string().url().optional(),
        tiktok: z.string().url().optional()
    }).optional()
})