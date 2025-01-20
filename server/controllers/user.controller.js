import pool from '../db/pool.js';

export const userInfo = async (req, res) => {
   try {
      const { userId } = req.user;

      const user = await pool.query(
         'SELECT user_name, user_email, created_at FROM users WHERE user_id = $1',
         [userId],
      );

      res.json(user.rows[0]);
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const updateUserInfo = async (req, res) => {
   try {
      const { user_name, user_email } = req.body;
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
      }

      if (user_name) {
         await pool.query(
            'UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING user_name',
            [user_name, userId],
         );
      }

      if (user_name && user_email) {
         await pool.query(
            'UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING user_name, user_email',
            [user_name, user_email, userId],
         );
      }

      res.json({ success: true, message: 'Profile updated successfully' });
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
