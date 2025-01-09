import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts)
router.put('/update/:id', updateProduct) 
router.post('/create', createProduct) 
router.delete('/delete/:id', deleteProduct) 

export default router;
