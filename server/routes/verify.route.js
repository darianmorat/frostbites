import { Router } from 'express';
import { forgotPassword, resetPassword, verifyUserEmail, ResendVerifyEmail } from '../controllers/verify.controller.js';

const router = Router();

router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

router.get('/verify-email/:token', verifyUserEmail)
router.post('/resend-verify-email', ResendVerifyEmail)

export default router;
