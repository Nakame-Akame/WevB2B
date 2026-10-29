export async function getCustomers(req, res) {
  return res.json({
    success: true,
    data: [
      { id: 'cust-1', name: 'Contoso Perú', type: 'b2b' },
      { id: 'cust-2', name: 'Cliente Retail', type: 'b2c' },
    ],
  });
}
