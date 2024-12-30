import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
 
dotenv.config() // Load environment variables from .env file

export default async (req, res, next) => {
   try {
      const token = req.header('token')

      if (!token) {
         return res.status(403).json({ success: false, message: 'Not authorized' })
      }

      const verify = jwt.verify(token, process.env.jwtSecret)
      req.user = verify.user
      next()

   } catch (err) {
      console.error(err.message)
      res.status(403).json({ success: false, message: 'Not authorized' })
   }
}

// sends error when is not authenticated, jwt malformed that's just because is not logged
