import pool from '../db/pool.js';

export const getProducts = async (req, res) => {
   try {
      const result = await pool.query('SELECT * FROM products');
      const products = result.rows;

      res.status(200).json({ success: true, products });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const updateProduct = async (req, res) => {
   try {
      const { imageUrl, name, price } = req.body;
      const { id } = req.params;

      await pool.query('DELETE FROM orders WHERE product_id = $1', [id])

      const result = await pool.query(
         'UPDATE products SET url = $1, name = $2, price = $3 WHERE id = $4 RETURNING *',
         [imageUrl, name, price, id],
      );

      const updatedProduct = result.rows[0];

      res.status(201).json({
         success: true,
         message: 'Product updated successfully',
         updatedProduct,
      });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const createProduct = async (req, res) => {
   try {
      const { imageUrl, name, price } = req.body;

      const newProduct = await pool.query(
         'INSERT INTO products (url, name, price) VALUES ($1, $2, $3) RETURNING *',
         [imageUrl, name, price],
      );

      const product = newProduct.rows[0];

      res.status(201).json({
         success: true,
         message: 'Product created successfully',
         product,
      });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

export const deleteProduct = async (req, res) => {
   try {
      const { id } = req.params;

      await pool.query('DELETE from products WHERE id = $1', [id]);

      res.status(200).json({ success: true, message: 'Product deleted successfully' });
   } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
   }
};
