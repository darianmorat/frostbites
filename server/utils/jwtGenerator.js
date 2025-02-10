import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// There's methods such as using cookies to store long term sessions

export function jwtGenerator(userId, isAdmin) {
   const payload = {
      user: userId,
      admin: isAdmin,
   };
   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export function jwtGeneratorVerify(userId, isAdmin) {
   const payload = {
      user: userId,
      admin: isAdmin,
   };
   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
}
