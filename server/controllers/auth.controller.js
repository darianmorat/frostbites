import pool from '../db/pool.js'
import bcrypt from 'bcrypt'
import { jwtGenerator, jwtGeneratorVerify } from '../utils/jwtGenerator.js'
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env file
 
export const registerUser = async (req, res) => {
   try {
      // Destructure the req.body
      const { name, email, password } = req.body

      const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
         email
      ])

      // Check if user exist
      if (user.rows.length !== 0){
         // Check if user exist and is verified
         if (user.rows[0].is_verified === false) {
            return res.status(401).json({ success: false, isVerified: false, message: 'Your email is not verified. Please check your inbox before logging in' });
         }

         return res.status(401).json({ success: false, message: 'User already exists'})
      }

      // Bcrypt the user password
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound)
      const bcryptPassword = await bcrypt.hash(password, salt)

      // Insert new user in database
      const newUser = await pool.query(
         "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", 
         [name, email, bcryptPassword]
      )

      // Role assignation
      let isAdmin = false

      if (email === process.env.ADMIN_EMAIL) { 
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

      // Add user role regarless to every user
      const userRole = process.env.USER_ROLE 

      const roles = await pool.query(
         "SELECT role_id FROM roles WHERE role_name = $1", 
         [userRole] 
      );

      const userId = newUser.rows[0].user_id
      const roleId = roles.rows[0].role_id

      await pool.query(
         "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *",
         [userId, roleId]
      )

      // Generate jwt token
      const token = jwtGeneratorVerify(newUser.rows[0].user_id)

      // Send verification email
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
         subject: 'Email Verification',
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

      // Use Nodemailer to send the verification email
      transporter.sendMail(mailOptions, (err, info) => {
         if (err) {
            return res.status(500).json({ success: false, message: 'Error sending email' });
         }
         res.status(200).json({ success: true, message: 'Registration successful! Please check your inbox' });
         // res.status(200).json({ success: true, token, isAdmin }) // no way to verify admin registration for now
      });

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

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

export const loginUser = async (req, res) => {
   try {
      const {email, password} = req.body

      let isAdmin = false

      if(email === process.env.ADMIN_EMAIL) {
         isAdmin = true
      }

      const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
         email
      ])

      if (user.rows.length === 0){
         return res.status(401).json({ success: false, message: 'Email or Password is incorrect'})
      }

      if (user.rows[0].is_verified === false) {
         return res.status(401).json({ success: false, isVerified: false, message: 'Your email is not verified. Please check your inbox before logging in' });
      }

      const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

      if(!validPassword){
         return res.status(401).json({ success: false, message: 'Email or Password is incorrect'})
      }

      const token = jwtGenerator(user.rows[0].user_id)
      res.status(200).json({ success: true, token, isAdmin })

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const verifyUser = async (req, res) => {
   try {
      const admin = req.header('admin')
      res.status(200).json({success: true, isAdmin: admin })

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

