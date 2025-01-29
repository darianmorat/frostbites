import pool from '../db/pool.js';

export const userInfo = async (req, res) => {
   try {
      const { userId } = req.user;

      const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
      const user = result.rows[0];

      res.status(200).json({ success: true, user });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const updateUserInfo = async (req, res) => {
   try {
      const { user_name, user_email, user_bio } = req.body;
      const { userId } = req.user;

      const currentUser = await pool.query('SELECT * FROM users WHERE user_id = $1', [
         userId,
      ]);

      if (user_email !== currentUser.rows[0].user_email) {
         const emailCheck = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [user_email],
         );

         if (emailCheck.rows.length !== 0) {
            return res
               .status(409)
               .json({ success: false, message: 'Email already in use' });
         }
      } else {
         await pool.query(
            'UPDATE users SET user_name = $1, user_email = $2, user_bio = $3 WHERE user_id = $4 RETURNING user_name, user_email, user_bio',
            [user_name, user_email, user_bio, userId],
         );

         const result = await pool.query('SELECT * FROM users WHERE user_email = $1', [
            user_email,
         ]);

         res.json({
            success: true,
            user: result.rows[0],
            message: 'Profile updated successfully',
         });
      }
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const deleteUserInfo = async (req, res) => {
   try {
      const { userId } = req.user;

      await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);

      res.json({ success: true, message: 'Profile deleted successfully' });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
