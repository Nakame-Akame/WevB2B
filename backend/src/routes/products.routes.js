import { Router } from 'express';
import { listProducts, getProduct, searchProducts } from '../controllers/products.controller.js';
import { validateProductsQuery } from '../validators/products.validator.js';

const router = Router();

router.get('/', validateProductsQuery, listProducts);
router.get('/search', validateProductsQuery, searchProducts);
router.get('/:productId', getProduct);

export default router;
