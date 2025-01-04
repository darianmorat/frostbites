import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env file

function jwtGenerator( user_id ){
   const payload = {
      user: user_id
   }

   // every 1h the user needs to login again
   // there's methods such as using cookies to store long term sessions
   return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1hr'})
}

export default jwtGenerator
