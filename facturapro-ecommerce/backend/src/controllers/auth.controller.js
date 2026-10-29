export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    return res.json({
      success: true,
      data: {
        user: { id: 'user-1', email, role: 'customer' },
        token: 'demo-token',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function register(req, res, next) {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Email and name are required.' });
    }

    return res.status(201).json({
      success: true,
      data: { user: { id: 'user-2', email, name, role: 'customer' } },
    });
  } catch (error) {
    next(error);
  }
}
