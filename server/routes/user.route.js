import { Router } from 'express';
import authorization from '../middleware/authorization.js';
import { userInfo, userUpdateInfo } from '../controllers/user.controller.js';

const router = Router();

router.get('/', authorization, userInfo)
router.put('/update', authorization, userUpdateInfo)

export default router;
