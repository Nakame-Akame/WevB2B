export async function getShippingMethods(req, res) {
  return res.json({
    success: true,
    data: [
      { id: 'pickup', label: 'Recojo en tienda', price: 0 },
      { id: 'standard', label: 'Envío estándar', price: 15 },
      { id: 'express', label: 'Envío express', price: 35 },
    ],
  });
}

export async function calculateShipping(req, res) {
  const { zipCode } = req.body;
  const freight = zipCode ? 18 : 12;

  return res.json({ success: true, data: { amount: freight, method: 'standard' } });
}
