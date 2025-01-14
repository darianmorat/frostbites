import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.route.js'
import verifyRoute from './routes/verify.route.js'

import userRoute from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'
import productRoute from './routes/product.route.js'

const app = express()
dotenv.config() // Load environment variables from .env file

// Middleware
app.use(express.json())
app.use(cors())

// Routes 
app.use("/auth", authRoute)
app.use("/verify", verifyRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/product", productRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`)
})
