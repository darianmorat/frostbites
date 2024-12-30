import pool from '../db/pool.js';

export const adminPanel = async (req, res) => {
   try {
      // const { user_name, user_email } = req.body
       
      // await pool.query('UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING user_name, user_email', 
      //    [user_name, user_email, req.user]
      // )
      // res.json({success: true})

   } catch (err) {
      console.error(err.message)
      res.status(500).json({ success: false, message: 'Server error' })
   }
}

export const getProducts = async (req, res) => {
   try {
      const products = await pool.query('SELECT * FROM products')
      res.status(200).json({ success: true, data: products });
   } catch (error) {
      console.log("error in fetching products:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
   }
};
