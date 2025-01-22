import pool from '../db/pool.js';

export const adminPanel = async (req, res) => {
   try {
      const resultUsers = await pool.query('SELECT COUNT(*) FROM users');
      const countUsers = resultUsers.rows[0];

      const resultProducts = await pool.query('SELECT COUNT(*) FROM products');
      const countProducts = resultProducts.rows[0];

      res.json({ success: true, countUsers, countProducts });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
