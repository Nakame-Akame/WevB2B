export async function getCartSummary(req, res) {
  return res.json({
    success: true,
    data: {
      items: [{ id: 'item-1', productId: 'prod-1', quantity: 2, unitPrice: 180 }],
      subtotal: 360,
      shipping: 15,
      total: 375,
    },
  });
}

export async function addItem(req, res) {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ success: false, message: 'productId and quantity are required.' });
  }

  return res.status(201).json({
    success: true,
    message: 'Item added to cart',
    data: { productId, quantity },
  });
}
