import express from 'express';
import { addProduct , getAllProducts, deleteProduct} from '../controllers/productController.js';

const router = express.Router();

router.put('/', addProduct);
router.get('/all', getAllProducts);
router.delete('/:name', deleteProduct);

export default router;