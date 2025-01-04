import pool from '../db/pool.js'
import bcrypt from 'bcrypt'
import jwtGenerator from '../utils/jwtGenerator.js'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env file
 
export const registerUser = async (req, res) => {
   try {
      // destructure the req.body
      const { name, email, password } = req.body

      // check if user exist
      const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
         email
      ])

      if (user.rows.length !== 0){
         return res.status(401).json({ success: false, message: 'User already exists'})
      }

      // bcrypt the user password
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound)

      const bcryptPassword = await bcrypt.hash(password, salt)

      // insert new user in database
      const newUser = await pool.query(
         "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", 
         [name, email, bcryptPassword]
      )

      // role assignation
      let isAdmin = false
      if(email === process.env.ADMIN_EMAIL){ 
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

      // add user role regarless to everyone
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

      // generate jwt token
      const token = jwtGenerator(newUser.rows[0].user_id)
      res.status(200).json({ success: true, token, isAdmin })

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const loginUser = async (req, res) => {
   try {
      // Destructure the req.body
      const {email, password} = req.body

      // check if user is admin
      let isAdmin = false

      if(email === process.env.ADMIN_EMAIL){
         isAdmin = true
      }

      // check if user doesn't exist
      const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
         email
      ])

      if (user.rows.length === 0){
         return res.status(401).json({ success: false, message: 'Email or Password is incorrect'})
      }

      // check is incoming password is same as the db password
      const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
      if(!validPassword){ // if false
         return res.status(401).json({ success: false, message: 'Email or Password is incorrect'})
      }

      // give them jwt token
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

