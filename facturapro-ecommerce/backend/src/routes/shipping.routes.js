import { Router } from 'express';
import { getShippingMethods, calculateShipping } from '../controllers/shipping.controller.js';

const router = Router();

router.get('/methods', getShippingMethods);
router.post('/quote', calculateShipping);

export default router;
