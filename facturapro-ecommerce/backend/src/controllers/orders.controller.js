export async function getOrders(req, res) {
  return res.json({
    success: true,
    data: [
      { id: 'ord-1', status: 'paid', total: 375, customerId: 'cust-1' },
    ],
  });
}

export async function createOrder(req, res) {
  const { customerId, items } = req.body;

  if (!customerId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'customerId and items are required.' });
  }

  return res.status(201).json({
    success: true,
    data: { id: 'ord-2', status: 'pending_payment', customerId, items },
  });
}
