import { Router } from 'express';
import { createPaymentSession, confirmPayment } from '../controllers/payments.controller.js';

const router = Router();

router.post('/sessions', createPaymentSession);
router.post('/confirm', confirmPayment);

export default router;
