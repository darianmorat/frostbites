import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env file

// There's methods such as using cookies to store long term sessions

export function jwtGenerator( user_id ){
   const payload = {
      user: user_id
   }

   return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1hr'})
}

export function jwtGeneratorVerify( user_id ){
   const payload = {
      user: user_id
   }

   return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '10m'})
}
