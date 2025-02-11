import pool from '../db/pool.js';
import bcrypt from 'bcrypt';
import { jwtGenerator, jwtGeneratorVerify } from '../utils/jwtGenerator.js';
import { verificationEmail } from '../mailtrap/emails.js';

const assignRole = async (userId, role) => {
   const roles = await pool.query('SELECT id FROM roles WHERE role = $1', [role]);
   const roleId = roles.rows[0].id;
   await pool.query(
      'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *',
      [userId, roleId],
   );
};

const roleAssignation = async (email, userId) => {
   const isAdmin = false;
   if (email === process.env.ADMIN_EMAIL) {
      await assignRole(userId, process.env.ADMIN_ROLE);
      isAdmin = true;
   }
   await assignRole(userId, process.env.USER_ROLE);
   return isAdmin;
};

export const registerUser = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length !== 0) {
         if (user.rows[0].is_verified === false) {
            return res.status(401).json({
               success: false,
               isVerified: false,
               message:
                  'Your email is not verified. Please check your inbox before logging in',
            });
         }
         return res.status(401).json({ success: false, message: 'User already exists' });
      }

      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const newUser = await pool.query(
         'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
         [name, email, bcryptPassword],
      );

      const userId = newUser.rows[0].id;
      const isAdmin = await roleAssignation(email, userId);
      const token = jwtGeneratorVerify(userId, isAdmin);
      const emailResponse = await verificationEmail(
         `${process.env.BASE_URL}/send-email/${token}`,
      );

      if (emailResponse.success) {
         return res.status(200).json({
            success: true,
            message: 'Registration successful! Please check your inbox',
         });
      } else {
         return res.status(500).json({
            success: false,
            message: 'Error sending email',
         });
      }
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;

      let isAdmin = false;
      if (email === process.env.ADMIN_EMAIL) {
         isAdmin = true;
      }

      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (user.rows.length === 0) {
         return res
            .status(401)
            .json({ success: false, message: 'Email or Password is incorrect' });
      }

      if (user.rows[0].auth_provider === 'google') {
         return res.status(401).json({
            success: false,
            message: 'Please login with Google and set a password!',
         });
      }

      if (user.rows[0].is_verified === false) {
         return res.status(401).json({
            success: false,
            isVerified: false,
            message:
               'Your email is not verified. Please check your inbox before logging in',
         });
      }

      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
         return res
            .status(401)
            .json({ success: false, message: 'Email or Password is incorrect' });
      }

      const resultPurchases = await pool.query(
         'SELECT * FROM payments WHERE customer_id = $1',
         [user.rows[0].id],
      );
      const purchases = resultPurchases.rows.length;

      const token = jwtGenerator(user.rows[0].id, isAdmin);
      res.status(200).json({
         success: true,
         message: 'Login successful!',
         user: user.rows[0],
         purchases,
         isAdmin,
         token,
      });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const registerUserGoogle = async (req, res) => {
   try {
      const { name, email, auth_provider } = req.body;

      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length !== 0) {
         return res
            .status(401)
            .json({ success: false, message: 'Already registered. Please login' });
      }

      const newUser = await pool.query(
         'INSERT INTO users (name, email, is_verified, auth_provider) VALUES ($1, $2, $3, $4) RETURNING *',
         [name, email, true, auth_provider],
      );

      const userId = newUser.rows[0].id;
      const isAdmin = await roleAssignation(email, userId);
      const token = jwtGenerator(userId, isAdmin);

      res.status(200).json({
         success: true,
         message: 'Register successfully',
         token,
      });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const loginUserGoogle = async (req, res) => {
   try {
      const { email } = req.body;

      let isAdmin = false;
      if (email === process.env.ADMIN_EMAIL) {
         isAdmin = true;
      }

      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
         return res.status(401).json({
            success: false,
            message: 'Not registered. Please Signup',
         });
      }

      const userId = user.rows[0].id;
      const resultPurchases = await pool.query(
         'SELECT * FROM payments WHERE customer_id = $1',
         [userId],
      );
      const purchases = resultPurchases.rows.length;

      const token = jwtGenerator(userId, isAdmin);
      res.status(200).json({
         success: true,
         message: 'Login successful!',
         user: user.rows[0],
         purchases,
         isAdmin,
         token,
      });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const verifyUser = async (req, res) => {
   try {
      const { userId, isAdmin } = req.user;

      const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

      if (userId) {
         res.status(200).json({ success: true, isAdmin, user: result.rows[0] });
      }
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
