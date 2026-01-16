/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node modules
import { configDotenv } from "dotenv"

// Types
import type ms from "ms"
configDotenv()

// Export Env Config
const Env = {
    PORT: process.env.PORT ,
    CORS_ORIGIN: process.env.CORS_ORIGIN ,
    CORS_METHODS: process.env.CORS_METHODS ,
    CORS_CREDENTIALS: process.env.CORS_CREDENTIALS,
    NODE_ENV: process.env.NODE_ENV,

   // White list Client in server
   WHITELISTED_DOMAINS: process.env.WHITELISTED_DOMAINS?.split(",") || [],
   WHITELISTED_ADMIN_MAIL: process.env.WHITELISTED_ADMIN_MAIL?.split(",") || [],

   // Database Config
   DB_USERNAME: process.env.DB_USERNAME,
   DB_PASSWORD: process.env.DB_PASSWORD,

   // Level Logger
   LOG_LEVEL: process.env.LOG_LEVEL,

   // Token Key Secret
   ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET as ms.StringValue,
   ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE as ms.StringValue, 

   REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET as ms.StringValue,
   REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE as ms.StringValue,

   // Hash
   SALT_ROUND: process.env.BCRYPT_SALT_ROUND,

   // Query limit
   DEFAULT_RES_LIMIT:20,
   DEFAULT_RES_OFFSET:0
}
export default Env