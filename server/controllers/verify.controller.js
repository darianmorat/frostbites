import pool from '../db/pool.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import { jwtGenerator, jwtGeneratorVerify } from '../utils/jwtGenerator.js'

dotenv.config() // Load environment variables from .env file

export const forgotPassword = async (req, res) => {
   try {
      const { email } = req.body

      // Find the user by email
      const result = await pool.query('SELECT * FROM users WHERE user_email = $1', 
         [ email ]
      )

      // If user not found, send error message
      if (result.rows.length === 0) {
         return res.status(404).json({ success: false, message: "Email not found" });
      }

      const user = result.rows[0]

      // Generate a unique JWT token for the user that contains the user's id
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {expiresIn: "10m"});

      // Send the token to the user's email
      const transporter = nodemailer.createTransport({
         host: "smtp.ethereal.email",
         port: 587,
         auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.PASSWORD_APP_EMAIL,
         },
      });

      // Email configuration
      const mailOptions = {
         from: process.env.APP_EMAIL,
         to: req.body.email,
         subject: "Reset Password",
         html: `
            <h1>Reset Your Password</h1>
            <p>Click on the following link to reset your password:</p>
            <a href="http://localhost:5173/reset-password/${token}">
               RESET PASSWORD
            </a>
            <p>The link will expire in 10 minutes.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>
         `
      }; // add a blank option to click and send u to a new tab instead

      // Send the email
      transporter.sendMail(mailOptions, (err, info) => {
         if (err) {
            return res.status(500).json({ success: false, message: err.message });
         }
         res.status(200).json({ success: true, message: "Email sent", token: token });
      });

   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

export const resetPassword = async (req, res) => {
   try {
      // Verify the token sent by the user
      const decodedToken = jwt.verify(
         req.params.token,
         process.env.JWT_SECRET
      );

      // Find the user with the id from the token
      const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [decodedToken.userId]);
      const user = result.rows[0]; 

      // Hash the new password
      const { newPassword } = req.body

      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound)
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update user's password, clear reset token and expiration time
      await pool.query('UPDATE users SET user_password = $1 WHERE user_id = $2', 
         [hashedPassword, user.user_id]
      );

      // Send success response
      res.status(200).json({ success: true, message: "Password updated" });

   } catch (err) {
      // Check if the error is related to expired JWT
      if (err.name === 'TokenExpiredError') {
         return res.status(401).json({ success: false, message: 'Link has already expired' })
      }

      // Catch any other errors
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const verifyUserEmail = async (req, res) => {
   try {
      const decoded = jwt.verify( req.params.token, process.env.JWT_SECRET);

      // Find the user in the database based on decoded user
      const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [decoded.user]);

      if (user.rows.length === 0) {
         return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Check if the user is already verified
      if (user.rows[0].is_verified) {
         return res.status(400).json({ success: false, message: 'Email already verified' });
      }

      // Mark the user as verified
      await pool.query('UPDATE users SET is_verified = true WHERE user_id = $1', [decoded.user]);

      // Give the user a jwt token
      const token = jwtGenerator(decoded.user)
      res.status(200).json({ success: true, message: 'Email verified successfully', token });

   } catch (err) {
      // Check if the error is related to expired JWT
      if (err.name === 'TokenExpiredError') {
         return res.status(401).json({ success: false, message: 'Link has already expired' })
      }

      // Catch any other errors
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const ResendVerifyEmail = async (req, res) => {
   const { email } = req.body

   const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email
   ])

   if (user.rows.length === 0){
      return res.status(400).json({ success: false, message: 'This email is not registered' });
   }

   if (user.rows[0].is_verified === true){
      return res.status(400).json({ success: false, message: 'This email is already verified' });
   }

   // const token = jwt.sign({ userId: user.rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '10m' });
   const token = jwtGeneratorVerify(user.rows[0].user_id)

   const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
         user: process.env.APP_EMAIL,
         pass: process.env.PASSWORD_APP_EMAIL,
      },
   });

   const mailOptions = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: 'RESEND Email Verification',
      html: `
         <h1>Verify your email</h1>
         <p>Click the following link to verify your email:</p>
         <a href="http://localhost:5173/verify-email/${token}">
            CLICK HERE TO VERIFY
         </a>
         <p>The link will expire in 10 minutes.</p>
         <p>If you didn't wanted to create an account, please ignore this email.</p>
      `
   };

   transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
         return res.status(500).json({ success: false, message: 'Error sending email' });
      }
      res.status(200).json({ success: true, message: 'Verification email resent. Please check your inbox' });
   });
}
