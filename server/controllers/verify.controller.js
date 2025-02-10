import pool from '../db/pool.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtGenerator, jwtGeneratorVerify } from '../utils/jwtGenerator.js';
import {
   resetPasswordEmail,
   verificationResentEmail,
   welcomeEmail,
} from '../mailtrap/emails.js';

export const forgotPassword = async (req, res) => {
   try {
      const { email } = req.body;

      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows.length === 0) {
         return res.status(404).json({ success: false, message: 'Email not found' });
      }

      const user = result.rows[0];
      const token = jwtGeneratorVerify(user.id);
      const emailResponse = await resetPasswordEmail(
         `${process.env.BASE_URL}/reset-password/${token}`,
      );

      if (emailResponse.success) {
         return res.status(200).json({
            success: true,
            message: 'Email sent, please check your inbox',
            token: token,
         });
      } else {
         return res.status(500).json({
            success: false,
            message: 'Error sending email',
         });
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

export const resetPassword = async (req, res) => {
   try {
      const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);

      const result = await pool.query('SELECT * FROM users WHERE id = $1', [
         decodedToken.user,
      ]);
      const user = result.rows[0];

      const { newPassword } = req.body;

      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await pool.query('UPDATE users SET password = $1 WHERE id = $2', [
         hashedPassword,
         user.id,
      ]);

      res.status(200).json({ success: true, message: 'Password updated' });
   } catch (err) {
      if (err.name === 'TokenExpiredError') {
         return res
            .status(401)
            .json({ success: false, message: 'Link has already expired' });
      }

      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const sendEmail = async (req, res) => {
   try {
      const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

      const user = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.user]);
      // const email = user.rows[0].email;

      if (user.rows.length === 0) {
         return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (user.rows[0].is_verified) {
         return res
            .status(400)
            .json({ success: false, message: 'Email already verified' });
      }

      await pool.query('UPDATE users SET is_verified = true WHERE id = $1', [
         decoded.user,
      ]);

      const token = jwtGenerator(decoded.user, decoded.admin);
      const emailResponse = await welcomeEmail();

      if (emailResponse.success) {
         return res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            token: token,
         });
      } else {
         return res.status(500).json({
            success: false,
            message: 'Error sending email',
         });
      }
   } catch (err) {
      if (err.name === 'TokenExpiredError') {
         return res
            .status(401)
            .json({ success: false, message: 'Link has already expired' });
      }

      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const resendEmail = async (req, res) => {
   const { email } = req.body;

   const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

   if (user.rows.length === 0) {
      return res
         .status(400)
         .json({ success: false, message: 'This email is not registered' });
   }

   if (user.rows[0].is_verified === true) {
      return res
         .status(400)
         .json({ success: false, message: 'This email is already verified' });
   }

   let isAdmin = false;

   if (email === process.env.ADMIN_EMAIL) {
      const adminRole = process.env.ADMIN_ROLE;

      const roles = await pool.query('SELECT id FROM roles WHERE role = $1', [adminRole]);

      const userId = user.rows[0].id;
      const roleId = roles.rows[0].id;

      await pool.query(
         'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *',
         [userId, roleId],
      );

      isAdmin = true;
   }

   const token = jwtGeneratorVerify(user.rows[0].id, isAdmin);
   const emailResponse = await verificationResentEmail(
      `${process.env.BASE_URL}/send-email/${token}`,
   );

   if (emailResponse.success) {
      return res.status(200).json({
         success: true,
         message: 'Verification email resent. Please check your inbox',
      });
   } else {
      return res.status(500).json({
         success: false,
         message: 'Error sending email',
      });
   }
};
