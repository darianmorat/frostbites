import { Router } from 'express';
import { handlePayment } from '../controllers/payment.controller.js';
import authorization from '../middleware/authorization.js';

const router = Router();

router.post('/check-session', authorization, handlePayment);

export default router;
