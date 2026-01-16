/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Generate a random username

export const genUsername = () : string =>{
    const usernamePrefix = "user-"
    const randomChars = Math.random().toString(36).slice(2)
    const username = usernamePrefix + randomChars
    return username
}

export const genSlug = (value: string): string => { 
    return value.toLowerCase() // chuyển hết sang chữ thường 
            .normalize("NFD") // chuẩn hóa Unicode để tách dấu 
            .replace(/[\u0300-\u036f]/g, "") // loại bỏ dấu tiếng Việt 
            .replace(/[^a-z0-9\s-]/g, "") // loại bỏ ký tự đặc biệt 
            .trim() // bỏ khoảng trắng đầu cuối
            .replace(/\s+/g, "-") // thay khoảng trắng bằng dấu gạch ngang
            .replace(/-+/g, "-"); // loại bỏ gạch ngang thừa 
}