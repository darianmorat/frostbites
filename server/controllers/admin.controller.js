import pool from '../db/pool.js';

export const getStats = async (req, res) => {
   try {
      const resultUsers = await pool.query(
         'SELECT id, name, email, created_at, is_verified FROM users',
      );
      const totalUsers = resultUsers.rows.filter(
         (user) => user.email !== process.env.ADMIN_EMAIL,
      );

      const resultProducts = await pool.query(
         'SELECT id, url, name, price FROM products',
      );
      const totalProducts = resultProducts.rows;

      const resultSales = await pool.query('SELECT amount FROM payments');
      const totalSales = resultSales.rows;

      res.json({ success: true, totalUsers, totalProducts, totalSales });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
