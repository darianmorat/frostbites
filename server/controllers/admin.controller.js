import pool from '../db/pool.js';

export const adminPanel = async (req, res) => {
   try {
      // Counters
      const resultUsers = await pool.query('SELECT COUNT(*) FROM users');
      const totalUsers = resultUsers.rows[0];

      const resultVerified = await pool.query(
         'SELECT COUNT(*) FROM users WHERE is_verified = true',
      );
      const totalVerifiedUsers = resultVerified.rows[0];

      const resultUnverified = await pool.query(
         'SELECT COUNT(*) FROM users WHERE is_verified = false',
      );
      const totalUnverifiedUsers = resultUnverified.rows[0];

      const resultProducts = await pool.query('SELECT COUNT(*) FROM products');
      const totalProducts = resultProducts.rows[0];

      // Data
      const resultVerifiedEmail = await pool.query(
         'SELECT user_name, user_email FROM users WHERE is_verified = true',
      );
      const verifiedEmails = resultVerifiedEmail.rows;

      const resultUnverifiedEmails = await pool.query(
         'SELECT user_name, user_email FROM users WHERE is_verified = false',
      );
      const unverifiedEmails = resultUnverifiedEmails.rows;

      res.json({
         success: true,
         // Counters
         totalUsers,
         totalVerifiedUsers,
         totalUnverifiedUsers,
         totalProducts,

         // Data
         verifiedEmails,
         unverifiedEmails,
      });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
