import { Router } from 'express';
import authorization from '../middleware/authorization.js';

import { registerUser, loginUser, verifyUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', authorization, verifyUser);

export default router;
