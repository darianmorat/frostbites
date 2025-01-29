import { Router } from 'express';
import {
   getOrder,
   addToCart,
   deleteFromCart,
   updateQuantity,
   deleteAllFromCart,
} from '../controllers/cart.controller.js';
import { privateRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', privateRoute, getOrder);
router.post('/add', privateRoute, addToCart);
router.delete('/delete/:id', privateRoute, deleteFromCart);
router.delete('/delete', privateRoute, deleteAllFromCart);
router.put('/update', privateRoute, updateQuantity);

export default router;
