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
         subject: "Reset Your Password",
         html: `
            <div style="color: #333; max-width: 550px; margin: 20px auto; padding: 25px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
               <h1 style="color: #1a73e8; text-align: center;">Reset Your Password</h1>
               <p>Click on the following link to reset your password:</p>
               <a href="http://localhost:5173/reset-password/${token}">
                  CLICK TO RESET PASSWORD
               </a>
               <p>The link will expire in 10 minutes.</p>
               <p>If you didn't request a password reset, please ignore this email.</p>
               <br/>
               <p style="text-align: center; color: #666;">Stay frosty, <br />The FrostBites Team </p>
               <p style="text-align: center;">
               <a href="http://localhost:5173" style="color: #1a73e8;">Visit FrostBites</a>
               </p>
            </div>
         `
      }; 

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

export const sendEmail = async (req, res) => {
   try {
      const decoded = jwt.verify( req.params.token, process.env.JWT_SECRET);

      // Find the user in the database based on decoded user
      const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [decoded.user]);
      const email = user.rows[0].user_email

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
      const token = jwtGenerator(decoded.user, decoded.admin)

      // Send welcome email
      const transporter = nodemailer.createTransport({
         host: "smtp.ethereal.email",
         port: 587,
         auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.PASSWORD_APP_EMAIL,
         }
      })

      const mailOptions = {
         from: process.env.APP_EMAIL,
         to: email,
         subject: 'Welcome to FROSTBITES',
         html: `
            <div style="color: #333; max-width: 550px; margin: 20px auto; padding: 25px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
               <h1 style="color: #1a73e8; text-align: center;">WELCOME TO FROSTBITES!</h1>
               <p>Hey there,</p>
               <p>We're excited to have you join the FrostBites family. Get ready to enjoy some seriously cool treats and exclusive offers just for you.</p>
               <p>Feel free to explore, chill, and taste the thrill. We’re here to make every bite an adventure!</p>
               <br/>
               <p style="text-align: center; color: #666;">Stay frosty,<br />The FrostBites Team</p>
               <p style="text-align: center;">
               <a href="http://localhost:5173" style="color: #1a73e8;">Visit FrostBites</a>
               </p>
            </div>
         `
      };

      transporter.sendMail(mailOptions, (err, info) => {
         if (err) {
            return res.status(500).json({ success: false, message: 'Error sending email' });
         }
         res.status(200).json({ success: true, message: 'Email verified successfully', token });
      });


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

export const resendEmail = async (req, res) => {
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

   // Role assignation
   let isAdmin = false

   if (email === process.env.ADMIN_EMAIL || email === process.env.ADMIN_EMAIL2) { 
      const adminRole = process.env.ADMIN_ROLE 

      const roles = await pool.query(
         "SELECT role_id FROM roles WHERE role_name = $1", 
         [adminRole] 
      );

      const userId = newUser.rows[0].user_id
      const roleId = roles.rows[0].role_id

      await pool.query(
         "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *",
         [userId, roleId]
      )

      isAdmin = true
   }

   const token = jwtGeneratorVerify(user.rows[0].user_id, isAdmin)

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
      subject: 'Email Verification (Resent)',
      html: `
         <div style="color: #333; max-width: 550px; margin: 20px auto; padding: 25px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
            <h1 style="color: #1a73e8; text-align: center;">Verify your email (Resent)</h1>
            <p>Click the following link to verify your email:</p>
            <a href="http://localhost:5173/send-email/${token}">
               CLICK TO VERIFY EMAIL
            </a>
            <p>The link will expire in 10 minutes.</p>
            <p>If you didn't wanted to create an account, please ignore this email.</p>
            <br/>
            <p style="text-align: center; color: #666;">Stay frosty, <br />The FrostBites Team </p>
            <p style="text-align: center;">
            <a href="http://localhost:5173" style="color: #1a73e8;">Visit FrostBites</a>
            </p>
         </div>
      `
   };

   transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
         return res.status(500).json({ success: false, message: 'Error sending email' });
      }
      res.status(200).json({ success: true, message: 'Verification email resent. Please check your inbox' });
   });
}
