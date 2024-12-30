import { Router } from 'express';
import validInfo from '../middleware/validInfo.js';
import authorization from '../middleware/authorization.js'

import { registerUser, loginUser, verifyUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', validInfo, registerUser)
router.post('/login', validInfo, loginUser)
router.get('/verify', authorization, verifyUser)

export default router;
