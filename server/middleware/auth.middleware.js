import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const privateRoute = async (req, res, next) => {
   try {
      const token = req.header('token');

      if (!token) {
         return res.status(403).json({ success: false, message: 'Not authorized' });
      }

      const verify = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
         userId: verify.user,
         isAdmin: verify.admin,
      };

      next();
   } catch (err) {
      if (err.name === 'TokenExpiredError') {
         return res.status(403).json({
            success: false,
            message: 'Your session has expired. Please log in again.',
         });
      }
      res.status(403).json({ success: false, message: 'Not authorized' });
   }
};

export const protectedRoute = async (req, res, next) => {
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
      if (err.name === 'TokenExpiredError') {
         return res.status(403).json({
            success: false,
            message: 'Your session has expired. Please log in again.',
         });
      }
      res.status(403).json({ success: false, message: 'Not authorized' });
   }
};
