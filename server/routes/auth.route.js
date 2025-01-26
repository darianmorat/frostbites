import { Router } from 'express';
import { privateRoute } from '../middleware/auth.middleware.js';
import { registerUser, loginUser, verifyUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/verify', privateRoute, verifyUser);

export default router;
