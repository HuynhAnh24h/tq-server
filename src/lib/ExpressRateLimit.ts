/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node modules
import {rateLimit} from 'express-rate-limit'


const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 60, // limit each IP to 60 requests per windowMs
    standardHeaders: 'draft-8', // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:{
        error: 'Too many requests, please try again later.'
    }
})

export default Limiter