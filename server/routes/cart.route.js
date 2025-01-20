import { Router } from 'express';
import { getOrder, addToCart, deleteFromCart } from '../controllers/cart.controller.js';
import authorization from '../middleware/authorization.js';

const router = Router();

router.get('/', authorization, getOrder);
router.post('/add', authorization, addToCart);
router.delete('/delete/:id', authorization, deleteFromCart);

export default router;
