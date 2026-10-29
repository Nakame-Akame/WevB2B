import { z } from 'zod';

const productsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  q: z.string().trim().optional().default(''),
});

export function validateProductsQuery(req, res, next) {
  const query = productsQuerySchema.safeParse(req.query);

  if (!query.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product query params.',
      errors: query.error.issues,
    });
  }

  req.query = query.data;
  next();
}
