import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'FacturaPro API is running',
    version: 'v1',
    timestamp: new Date().toISOString(),
  });
});

export default router;
