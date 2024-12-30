import pool from '../db/pool.js';

export const productInfo = async (req, res) => {
   try {
      const products = await pool.query('SELECT * FROM products')
      res.json(products.rows)

   } catch (error) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}
