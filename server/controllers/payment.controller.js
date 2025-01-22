import Stripe from 'stripe';
import pool from '../db/pool.js';

// guests need to type their email before going forward
// const { email } = req.body;
// if (!email) return res.status(400).send({ message: 'Please enter the email' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handlePayment = async (req, res) => {
   try {
      const { cart } = req.body;
      const { userId } = req.user;

      const response = await pool.query(
         'SELECT user_email FROM users WHERE user_id = $1',
         [userId],
      );
      const email = response.rows[0].user_email;

      const lineItems = cart.map((item) => ({
         price_data: {
            currency: 'usd',
            product_data: {
               name: item.product_name,
               // description: `DESCRIPTION HERE`,
            },
            unit_amount: item.product_price * 100,
         },
         quantity: item.quantity,
      }))

      const session = await stripe.checkout.sessions.create({
         mode: 'payment',
         line_items: lineItems,
         customer_email: email,
         success_url: `${process.env.BASE_URL}/success`, // send email when payment completed
         cancel_url: `${process.env.BASE_URL}/shop`, // what to do here?
         // cancel_url: `http://localhost:5173/canceled`,
      });

      const url = session.url;
      res.status(200).send({ success: true, message: 'order created', url });
   } catch (err) {
      res.status(500).send({ success: false, message: 'Something went wrong', err });
   }
};
