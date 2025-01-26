import { Router } from 'express';
import { handlePayment } from '../controllers/payment.controller.js';
import { privateRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/check-session', privateRoute, handlePayment);

export default router;
