import { Router } from 'express';
import { privateRoute } from '../middleware/auth.middleware.js';
import {
   userInfo,
   updateUserInfo,
   deleteUserInfo,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', privateRoute, userInfo);
router.put('/update', privateRoute, updateUserInfo);
router.delete('/delete', privateRoute, deleteUserInfo);

export default router;
