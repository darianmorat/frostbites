import { Router } from 'express';
import {
   forgotPassword,
   resetPassword,
   sendEmail,
   resendEmail,
} from '../controllers/verify.controller.js';

const router = Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.get('/send-email/:token', sendEmail);
router.post('/resend-email', resendEmail);

export default router;
