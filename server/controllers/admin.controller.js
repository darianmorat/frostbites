import pool from '../db/pool.js';

export const adminPanel = async (req, res) => {
   try {
      const count = await pool.query('SELECT COUNT(*) FROM users');
      const countUsers = count.rows[0];

      res.json({ success: true, countUsers });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
