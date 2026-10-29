export async function listCategories(req, res, next) {
  try {
    const categories = [
      { id: 'cat-1', name: 'Electrónica', slug: 'electronica' },
      { id: 'cat-2', name: 'Ferretería', slug: 'ferreteria' },
      { id: 'cat-3', name: 'Hogar', slug: 'hogar' },
    ];

    return res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
}
