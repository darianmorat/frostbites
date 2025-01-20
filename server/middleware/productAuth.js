import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async (req, res, next) => {
   try {
      const token = req.header('token');

      if (!token) {
         return res.status(403).json({ success: false, message: 'Not authorized' });
      }

      const verify = jwt.verify(token, process.env.JWT_SECRET);

      if (verify.admin === false) {
         return res
            .status(403)
            .json({ success: false, message: 'Access denied. Admins only' });
      }

      next();
   } catch (err) {
      res.status(403).json({ success: false, message: 'Not authorized' });
   }
};
