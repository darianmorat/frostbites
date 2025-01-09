import pool from '../db/pool.js';

export const userInfo = async (req, res) => {
   try {
      const user = await pool.query('SELECT user_name, user_email, created_at FROM users WHERE user_id = $1', 
         [req.user]
      )
      res.json(user.rows[0])

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const updateUserInfo = async (req, res) => {
   try {
      // Destructure the req.body
      const { user_name, user_email } = req.body;

      // Get the current user information
      const currentUser = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.user]);

      // If the email is different from the current email, check if it's already in use
      if (user_email && user_email !== currentUser.rows[0].user_email) {
         const emailCheck = await pool.query('SELECT * FROM users WHERE user_email = $1', [user_email]);

         if (emailCheck.rows.length !== 0) {
            return res.status(409).json({ success: false, message: 'Email already in use' });
         }
      }

      // If the user is just changing the username
      if (user_name) {
         await pool.query('UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING user_name', 
            [user_name, req.user]
         );
      }

      // If the user is changing both username and email
      if (user_name && user_email) {
         await pool.query('UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING user_name, user_email', 
            [user_name, user_email, req.user]
         );
      }

      // Return success response
      res.json({ success: true, message: 'Profile updated successfully' });

   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const deleteUserInfo = async (req, res) => {
   try {

      await pool.query('DELETE FROM users WHERE user_id = $1', [req.user]);

      res.json({ success: true, message: 'Profile deleted successfully' });

   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
