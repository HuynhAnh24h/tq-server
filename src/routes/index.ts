/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Nodemodules
import { Router } from "express"

const router = Router()

// Root Route
router.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'API is running', 
        status: 'success', 
        version: "1.0.0",
        documentation: 'https://www.facebook.com/?locale=vi_VN',
        time: new Date().toISOString()
    })
})


export default router