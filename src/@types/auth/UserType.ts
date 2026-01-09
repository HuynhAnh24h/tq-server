export interface IUser{
    username:string
    email: string,
    password: string,
    role: "admin" | "manager" | 'user',
    firstName?: string,
    lastName?: string,
    phone?: string,
    address?: string,
    socialLinks?:{
        facebook?: string,
        instagram?:string,
        twitter?:string,
        tiktok?:string
    }
}