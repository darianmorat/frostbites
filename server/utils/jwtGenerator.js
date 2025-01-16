import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// There's methods such as using cookies to store long term sessions

export function jwtGenerator( user_id, isAdmin ){
   const payload = {
      user: user_id,
      admin: isAdmin
   }

   return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1hr'})
}

export function jwtGeneratorVerify( user_id, isAdmin ){
   const payload = {
      user: user_id,
      admin: isAdmin
   }

   return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '10m'})
}
