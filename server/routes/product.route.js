import { Router } from 'express';
import { productInfo } from '../controllers/product.controller.js';

const router = Router();

router.get('/', productInfo)

export default router;
