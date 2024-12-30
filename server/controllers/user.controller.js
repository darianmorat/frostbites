import pool from '../db/pool.js';

export const userInfo = async (req, res) => {
   try {
      const user = await pool.query('SELECT user_name, user_email, created_at FROM users WHERE user_id = $1', 
         [req.user]
      )
      res.json(user.rows[0])

   } catch (error) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const userUpdateInfo = async (req, res) => {
   try {
      const { user_name, user_email } = req.body
       
      await pool.query('UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING user_name, user_email', 
         [user_name, user_email, req.user]
      )
      res.json({success: true})

   } catch (error) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

