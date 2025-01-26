import pool from '../db/pool.js';

export const getStats = async (req, res) => {
   try {
      const resultUsers = await pool.query(
         'SELECT user_id, user_name, user_email, created_at, is_verified FROM users',
      );
      const totalUsers = resultUsers.rows.filter(
         (user) =>
            user.user_email !== process.env.ADMIN_EMAIL &&
            user.user_email !== process.env.ADMIN_EMAIL2,
      );

      const resultProducts = await pool.query(
         'SELECT product_id, product_name, product_price, product_img FROM products',
      );
      const totalProducts = resultProducts.rows;

      res.json({ success: true, totalUsers, totalProducts });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
