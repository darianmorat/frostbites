import pool from '../db/pool.js';

export const userInfo = async (req, res) => {
   try {
      const { userId } = req.user;

      const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      const user = result.rows[0];

      const resultPurchases = await pool.query(
         'SELECT * FROM payments WHERE customer_id = $1',
         [userId],
      );
      const purchases = resultPurchases.rows.length;

      res.status(200).json({ success: true, user, purchases });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const updateUserInfo = async (req, res) => {
   try {
      const { name, email, bio, phone, address } = req.body;
      const { userId } = req.user;

      const currentUser = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

      if (email !== currentUser.rows[0].email) {
         const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [
            email,
         ]);

         if (emailCheck.rows.length !== 0) {
            return res
               .status(409)
               .json({ success: false, message: 'Email already in use' });
         }
      }

      await pool.query(
         'UPDATE users SET name = $1, email = $2, bio = $3, phone = $4, address = $5 WHERE id = $6 RETURNING *',
         [name, email, bio, phone, address, userId],
      );

      res.json({ success: true, message: 'Profile updated successfully' });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const deleteUserInfo = async (req, res) => {
   try {
      const { userId } = req.user;

      await pool.query('DELETE FROM users WHERE id = $1', [userId]);

      res.json({ success: true, message: 'Profile deleted successfully' });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
