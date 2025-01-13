import { Router } from 'express';
import authorization from '../middleware/authorization.js'

import { registerUser, loginUser, verifyUser, verifyUserEmail, ResendVerifyEmail } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser)
router.get('/verify-email/:token', verifyUserEmail)
router.post('/resend-verify-email', ResendVerifyEmail)
router.post('/login', loginUser)
router.get('/verify', authorization, verifyUser)

export default router;
