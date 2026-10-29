export async function getAdminOverview(req, res) {
  return res.json({
    success: true,
    data: {
      salesToday: 1234.5,
      ordersPending: 18,
      lowStock: 5,
      conversionRate: 3.8,
    },
  });
}
