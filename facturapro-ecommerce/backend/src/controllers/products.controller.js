import { listProducts as getProducts, getProductById, searchProducts as queryProducts } from '../services/products.service.js';

export async function listProducts(req, res, next) {
  try {
    const products = await getProducts({
      page: Number(req.query.page ?? 1),
      limit: Number(req.query.limit ?? 12),
      q: req.query.q ?? '',
    });

    res.json({ success: true, data: products, meta: { page: 1, limit: products.length } });
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    return res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

export async function searchProducts(req, res, next) {
  try {
    const products = await queryProducts({
      q: req.query.q ?? '',
      page: Number(req.query.page ?? 1),
      limit: Number(req.query.limit ?? 12),
    });

    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
}
