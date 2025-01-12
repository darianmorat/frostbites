import pool from '../db/pool.js';

export const getProducts = async (req, res) => {
   try {
      const result = await pool.query('SELECT * FROM products')
      const products = result.rows

      res.status(200).json({ success: true, products })

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const updateProduct = async (req, res) => {
   try {
      const { image, name, price } = req.body
      const { id } = req.params
       
      const result = await pool.query('UPDATE products SET product_img = $1, product_name = $2, product_price = $3 WHERE product_id = $4 RETURNING product_img, product_name, product_price', 
         [image, name, price, id]
      )

      const updatedProduct = result.rows[0]

      res.status(201).json({ success: true, message: 'Product updated successfully', updatedProduct })

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const createProduct = async (req, res) => {
   try {
      const { image, name, price } = req.body

      if (![image, name, price].every(Boolean)) {
         return res.json({ message: 'All fields are required!'})
      }

      const newProduct = await pool.query(
         "INSERT INTO products (product_img, product_name, product_price) VALUES ($1, $2, $3) RETURNING *", 
         [image, name, price]
      )

      const product = newProduct.rows[0]

      res.status(201).json({ success: true, message: 'Product created successfully', product })

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const deleteProduct = async (req, res) => {
   try {
      const { id } = req.params
       
      await pool.query('DELETE from products WHERE product_id = $1', 
         [id]
      )

      res.status(200).json({ success: true, message: 'Product deleted successfully' })

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

