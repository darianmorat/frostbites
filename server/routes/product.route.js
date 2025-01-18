import { Router } from 'express';
import {
   getProducts,
   createProduct,
   updateProduct,
   deleteProduct,
} from '../controllers/product.controller.js';
import productAuth from '../middleware/productAuth.js';

const router = Router();

router.get('/', getProducts);
router.put('/update/:id', productAuth, updateProduct);
router.post('/create', productAuth, createProduct);
router.delete('/delete/:id', productAuth, deleteProduct);

export default router;
