/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Nodemodules
import { Router } from "express"


// App Routes
import AuthRoutes from "./v1/auth/AuthRoute"
import UserRoutes from "./v1/auth/UserRoute"


import BlogRouter from "./v1/BlogRoute"
import DashboardRoute from "./v1/DashboardRoute"
import LandingRoute from "./v1/LandingRoute"
import ProductRoute from "./v1/ProductRoute"

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


// Auth And User
router.use("/auth",AuthRoutes)
router.use("/user", UserRoutes)


router.use("/blog",BlogRouter)
router.use("/dashboard", DashboardRoute)
router.use("/landing-page", LandingRoute)
router.use("/product", ProductRoute)

export default router