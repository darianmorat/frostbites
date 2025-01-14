import pool from '../db/pool.js'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import { jwtGenerator, jwtGeneratorVerify } from '../utils/jwtGenerator.js'

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
      const token = jwtGeneratorVerify(newUser.rows[0].user_id, isAdmin)

      // Send verification email
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
         subject: 'Email Verification',
         html: `
            <h1>Verify your email</h1>
            <p>Click the following link to verify your email:</p>
            <a href="http://localhost:5173/send-email/${token}">
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
      });

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const loginUser = async (req, res) => {
   try {
      const {email, password} = req.body

      let isAdmin = false

      if(email === process.env.ADMIN_EMAIL || email === process.env.ADMIN_EMAIL2) {
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

      const token = jwtGenerator(user.rows[0].user_id, isAdmin)
      res.status(200).json({ success: true, token, isAdmin })

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const verifyUser = async (req, res) => {
   try {
      const { userId, isAdmin } = req.user

      if(userId){
         res.status(200).json({success: true, isAdmin })
      }

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

