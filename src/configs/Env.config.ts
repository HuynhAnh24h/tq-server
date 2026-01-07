/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node modules
import { configDotenv } from "dotenv"
configDotenv()

// Export Env Config
const Env = {
    PORT: process.env.PORT ,
    CORS_ORIGIN: process.env.CORS_ORIGIN ,
    CORS_METHODS: process.env.CORS_METHODS ,
    CORS_CREDENTIALS: process.env.CORS_CREDENTIALS,
    NODE_ENV: process.env.NODE_ENV,


   WHITELISTED_DOMAINS: process.env.WHITELISTED_DOMAINS?.split(",") || []
}
export default Env