import Stripe from 'stripe';
import pool from '../db/pool.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handlePayment = async (req, res) => {
   try {
      const { cart } = req.body;
      const { userId } = req.user;

      const response = await pool.query('SELECT email FROM users WHERE id = $1', [
         userId,
      ]);
      const email = response.rows[0].email;

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
      }));

      const session = await stripe.checkout.sessions.create({
         mode: 'payment',
         line_items: lineItems,
         customer_email: email,
         success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // send email when payment completed
         cancel_url: `${process.env.BASE_URL}/shopping`, // what to do here?
      });

      const url = session.url;
      res.status(200).send({ success: true, message: 'order created', url });
   } catch (err) {
      res.status(500).send({ success: false, message: 'Something went wrong' });
   }
};

export const successPayment = async (req, res) => {
   try {
      const { userId } = req.user;

      const sessionId = req.query.session_id;
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const customer_email = session.customer_email;
      const payment_status = session.payment_status;
      const session_status = session.status;
      const total_payment = session.amount_total / 100;
      const total = total_payment.toFixed(2);

      const existingPayment = await pool.query(
         'SELECT * FROM payments WHERE session_id = $1',
         [sessionId],
      );

      if (existingPayment.rows.length > 0) {
         return res
            .status(200)
            .send({ success: true, message: 'Payment already recorded' });
      }

      await pool.query(
         'INSERT INTO payments (session_id, customer_id, customer_email, amount, payment_status, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
         [sessionId, userId, customer_email, total, payment_status, session_status],
      );

      res.status(200).send({ success: true, message: 'Payment successfull' });
   } catch (err) {
      res.status(500).send({ success: false, message: 'Something went wrong' });
   }
};
