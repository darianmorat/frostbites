import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/auth.route.js';
import verifyRoute from './routes/verify.route.js';

import userRoute from './routes/user.route.js';
import adminRoute from './routes/admin.route.js';
import productRoute from './routes/product.route.js';
import cartRoute from './routes/cart.route.js';
import paymentRoute from './routes/payment.route.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoute);
app.use('/verify', verifyRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/payment', paymentRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
});
