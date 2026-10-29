export async function getInvoiceByOrder(req, res) {
  const { orderId } = req.params;

  return res.json({
    success: true,
    data: {
      orderId,
      type: 'invoice',
      series: 'F001',
      number: '000123',
      status: 'issued',
    },
  });
}
