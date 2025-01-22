import pool from '../db/pool.js';

export const getOrder = async (req, res) => {
   try {
      const { userId } = req.user;

      const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [
         userId,
      ]);
      const order = result.rows;

      await pool.query('UPDATE users SET cart_items = $1 WHERE user_id = $2', [
         order.length,
         userId,
      ]);

      res.status(200).json({ success: true, order });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const addToCart = async (req, res) => {
   try {
      const { productId } = req.body;
      const { userId } = req.user;

      const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [
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
         const existingOrder = cartResult.rows[0];
         const updatedQuantity = existingOrder.quantity + 1;

         await pool.query(
            'UPDATE orders SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
            [updatedQuantity, userId, productId],
         );

         return res
            .status(200)
            .json({ sucess: true, message: 'Product + quantity updated in cart' });
      } else {
         await pool.query(
            'INSERT INTO orders (user_id, product_id, product_name, product_price, quantity) VALUES ($1, $2, $3, $4, $5)',
            [userId, productId, product.product_name, product.product_price, 1],
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
         const existingOrder = cartResult.rows[0];
         const updatedQuantity = existingOrder.quantity - 1;

         if (updatedQuantity <= 0) {
            await pool.query(
               'DELETE FROM orders WHERE user_id = $1 AND product_id = $2',
               [userId, productId],
            );
            return res
               .status(200)
               .json({ success: true, message: 'Product removed from cart' });
         }
         await pool.query(
            'UPDATE orders SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
            [updatedQuantity, userId, productId],
         );
         return res
            .status(200)
            .json({ sucess: true, message: 'Product - quantity updated in cart' });
      }
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
