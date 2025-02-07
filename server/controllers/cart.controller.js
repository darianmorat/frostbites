import pool from '../db/pool.js';

export const getOrder = async (req, res) => {
   try {
      const { userId } = req.user;

      const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [
         userId,
      ]);

      res.status(200).json({ success: true, cartItems: result.rows });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const addToCart = async (req, res) => {
   try {
      const { productId } = req.body;
      const { userId } = req.user;

      const result = await pool.query('SELECT * FROM products WHERE id = $1', [
         productId,
      ]);
      const product = result.rows[0];

      if (!product) {
         return res.status(404).json({ sucess: false, message: 'Product not found' });
      }

      const cartResult = await pool.query(
         'SELECT * FROM orders WHERE user_id = $1 AND product_id = $2',
         [userId, productId],
      );

      if (cartResult.rows.length > 0) {
         return res
            .status(500)
            .json({ success: false, message: 'Product already in cart' });
      } else {
         await pool.query(
            'INSERT INTO orders (user_id, product_id, product_name, product_price, quantity) VALUES ($1, $2, $3, $4, $5)',
            [userId, productId, product.name, product.price, 1],
         );

         return res.status(200).json({ success: true, message: 'Product added to cart' });
      }
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const deleteFromCart = async (req, res) => {
   try {
      const { id } = req.params;
      const { userId } = req.user;
      const productId = id;

      const cartResult = await pool.query(
         'SELECT * FROM orders WHERE user_id = $1 AND product_id = $2',
         [userId, productId],
      );

      if (cartResult.rows.length > 0) {
         await pool.query('DELETE FROM orders WHERE user_id = $1 AND product_id = $2', [
            userId,
            productId,
         ]);

         return res
            .status(200)
            .json({ success: true, message: 'Product removed from cart' });
      } else {
         return res
            .status(404)
            .json({ success: false, message: 'Product not found in cart' });
      }
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const deleteAllFromCart = async (req, res) => {
   try {
      const { userId } = req.user;

      await pool.query('DELETE FROM orders WHERE user_id = $1', [userId]);
      return res
         .status(200)
         .json({ success: true, message: 'Cart cleared successfully' });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const updateQuantity = async (req, res) => {
   try {
      const { productId, quantity } = req.body;
      const { userId } = req.user;

      const cartResult = await pool.query(
         'SELECT * FROM orders WHERE user_id = $1 AND product_id = $2',
         [userId, productId],
      );

      if (cartResult.rows.length > 0) {
         await pool.query(
            'UPDATE orders SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
            [quantity, userId, productId],
         );

         return res.status(200).json({
            success: true,
            message: 'Product quantity updated',
         });
      }
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
