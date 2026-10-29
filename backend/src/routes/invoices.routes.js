import { Router } from 'express';
import { getInvoiceByOrder } from '../controllers/invoices.controller.js';

const router = Router();

router.get('/:orderId', getInvoiceByOrder);

export default router;
