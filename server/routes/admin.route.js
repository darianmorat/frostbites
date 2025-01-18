import { Router } from 'express';
import { adminPanel } from '../controllers/admin.controller.js';

const router = Router();

router.get('/', adminPanel);

export default router;
