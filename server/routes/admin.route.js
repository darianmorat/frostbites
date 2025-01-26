import { Router } from 'express';
import { getStats } from '../controllers/admin.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/stats', protectedRoute, getStats);

export default router;
