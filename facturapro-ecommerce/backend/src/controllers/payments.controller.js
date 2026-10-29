export async function createPaymentSession(req, res) {
  return res.json({
    success: true,
    data: {
      sessionId: 'pay-session-123',
      redirectUrl: 'https://example.com/payment/confirm',
    },
  });
}

export async function confirmPayment(req, res) {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ success: false, message: 'sessionId is required.' });
  }

  return res.json({ success: true, data: { status: 'paid', sessionId } });
}
