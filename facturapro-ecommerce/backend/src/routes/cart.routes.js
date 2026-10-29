import { Router } from 'express';
import { getCartSummary, addItem } from '../controllers/cart.controller.js';

const router = Router();

router.get('/', getCartSummary);
router.post('/items', addItem);

export default router;
