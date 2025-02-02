import { Router } from 'express';
import { handlePayment, successPayment } from '../controllers/payment.controller.js';
import { privateRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/check-session', privateRoute, handlePayment);
router.get('/success', privateRoute, successPayment);

export default router;
