import pool from '../db/pool.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { jwtGenerator, jwtGeneratorVerify } from '../utils/jwtGenerator.js';

export const forgotPassword = async (req, res) => {
   try {
      const { email } = req.body;

      const result = await pool.query('SELECT * FROM users WHERE email = $1', [
         email,
      ]);

      if (result.rows.length === 0) {
         return res.status(404).json({ success: false, message: 'Email not found' });
      }

      const user = result.rows[0];
      const token = jwtGeneratorVerify(user.id);

      const transporter = nodemailer.createTransport({
         host: 'live.smtp.mailtrap.io',
         port: 587,
         auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
         },
      });

      const mailOptions = {
         from: `"FrostBites Support" <${process.env.MAILTRAP_EMAIL}>`,
         to: 'yojhandariantoledomora@gmail.com', // use 'email' later
         subject: 'Reset Your Password',
         html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
               <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
                  <h1 style="color: #1a73e8; font-size: 24px; margin: 0; font-weight: bold;">Reset Your Password</h1>
               </header>
               <main style="padding: 20px;">
                  <p style="font-size: 16px; margin-top: 30px"> Hi, It seems like you’ve requested to reset your password for your FrostBites account. No worries we’re here to help! <br/>
                  <br/>
                  Simply click the button below to reset your password:</p>
                  <div style="text-align: center; margin: 30px 0;">
                     <a href="${process.env.BASE_URL}/reset-password/${token}" 
                        style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #1a73e8; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Reset Password
                     </a>
                  </div>
                  <p style="font-size: 16px;">
                     This link will expire in <strong>10 minutes</strong>. If you did not request for a password reset, you can safely ignore this email.
                  </p>
               </main>
               <footer style="padding: 20px; border-top: 1px solid #e5e5e5; line-height:0.7; margin-top: 30px; text-align: center;">
                  <p style="font-size: 14px; color: #666;">Stay frosty,</p>
                  <p style="font-size: 14px; color: #666;"><strong>The FrostBites Team</strong></p>
                  <a href="${process.env.BASE_URL}" style="color: #1a73e8; text-decoration: none; font-size: 14px;">Visit FrostBites</a>
               </footer>
            </div>
         `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
         if (err) {
            return res.status(500).json({ success: false, message: err.message });
         }
         res.status(200).json({
            success: true,
            message: 'Email sent, please check your inbox',
            token: token,
         });
      });
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

      const user = await pool.query('SELECT * FROM users WHERE id = $1', [
         decoded.user,
      ]);
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

      const transporter = nodemailer.createTransport({
         host: 'live.smtp.mailtrap.io',
         port: 587,
         auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
         },
      });

      const mailOptions = {
         from: `"FrostBites Team" <${process.env.MAILTRAP_EMAIL}>`,
         to: 'yojhandariantoledomora@gmail.com', // use 'email' later
         subject: 'Welcome to FROSTBITES',
         html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
               <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
                  <h1 style="color: #1a73e8; font-size: 24px; margin: 0; font-weight: bold;">Welcome to FrostBites</h1>
               </header>
               <main style="padding: 20px;">
                  <p style="font-size: 16px; margin-top: 30px">
                     Hey there, we're excited to have you join the <strong>FrostBites</strong> family. Get ready to enjoy some seriously cool treats and exclusive offers just for you.
                  </p>           
                  <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" 
                     alt="FrostBites Logo" 
                     style="border-radius: 5px; max-width: 550px; margin: 0 auto; margin-bottom: 20px; display: block;"
                  >
               </main>
               <footer style="padding: 20px; border-top: 1px solid #e5e5e5; line-height:0.7; margin-top: 30px; text-align: center;">
                  <p style="font-size: 14px; color: #666;">Stay frosty,</p>
                  <p style="font-size: 14px; color: #666;"><strong>The FrostBites Team</strong></p>
                  <a href="${process.env.BASE_URL}" style="color: #1a73e8; text-decoration: none; font-size: 14px;">Visit FrostBites</a>
               </footer>
            </div>
         `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
         if (err) {
            return res
               .status(500)
               .json({ success: false, message: 'Error sending email' });
         }
         res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            token,
         });
      });
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

      const roles = await pool.query('SELECT id FROM roles WHERE role = $1', [
         adminRole,
      ]);

      const userId = user.rows[0].id;
      const roleId = roles.rows[0].id;

      await pool.query(
         'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *',
         [userId, roleId],
      );

      isAdmin = true;
   }

   const token = jwtGeneratorVerify(user.rows[0].id, isAdmin);

   const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
         user: process.env.MAILTRAP_USER,
         pass: process.env.MAILTRAP_PASS,
      },
   });

   const mailOptions = {
      from: `"FrostBites Team" <${process.env.MAILTRAP_EMAIL}>`,
      to: 'yojhandariantoledomora@gmail.com', // use 'email' later
      subject: 'Email Verification (Resent)',
      html: `
         <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
               <h1 style="color: #1a73e8; font-size: 24px; margin: 0; font-weight: bold;">Verify Your Email</h1>
            </header>
            <main style="padding: 20px;">
               <p style="font-size: 16px; margin-top: 30px">
                  Thank you for signing up with <strong>FrostBites</strong>! To complete your registration, please verify your email address by clicking the button below:
               </p>
               <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.BASE_URL}/send-email/${token}" 
                     style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #1a73e8; text-decoration: none; border-radius: 5px; font-weight: bold;">
                     Verify Email (Resent)
                  </a>
               </div>
               <p style="font-size: 16px;">
                  This link will expire in <strong>10 minutes</strong>. If you did not sign up for a FrostBites account, you can safely ignore this email.
               </p>
            </main>
            <footer style="padding: 20px; border-top: 1px solid #e5e5e5; line-height:0.7; margin-top: 30px; text-align: center;">
               <p style="font-size: 14px; color: #666;">Stay frosty,</p>
               <p style="font-size: 14px; color: #666;"><strong>The FrostBites Team</strong></p>
               <a href="${process.env.BASE_URL}" style="color: #1a73e8; text-decoration: none; font-size: 14px;">Visit FrostBites</a>
            </footer>
         </div>
      `,
   };

   transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
         return res.status(500).json({ success: false, message: 'Error sending email' });
      }
      res.status(200).json({
         success: true,
         message: 'Verification email resent. Please check your inbox',
      });
   });
};
