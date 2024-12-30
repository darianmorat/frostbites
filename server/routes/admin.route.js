import { Router } from 'express';
import authorization from '../middleware/authorization.js';
import { adminPanel, getProducts } from '../controllers/admin.controller.js';

const router = Router();

router.get('/', authorization, adminPanel) 

// router.get('/', authorization, getProducts)
// router.post('/update', authorization, createProduct) 
// router.put('/update', authorization, updateProduct) 
// router.delete('/delete', authorization, deleteProduct) 

export default router;
