import { Router } from 'express';
import authorization from '../middleware/authorization.js';
import { userInfo, updateUserInfo, deleteUserInfo } from '../controllers/user.controller.js';

const router = Router();

router.get('/', authorization, userInfo)
router.put('/update', authorization, updateUserInfo)
router.delete('/delete', authorization, deleteUserInfo)

export default router;
