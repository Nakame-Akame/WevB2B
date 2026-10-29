import { Router } from 'express';
import { getAdminOverview } from '../controllers/admin.controller.js';

const router = Router();

router.get('/overview', getAdminOverview);

export default router;
