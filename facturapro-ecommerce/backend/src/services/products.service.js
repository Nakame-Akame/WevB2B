import { supabase } from '../config/supabase.js';

const demoProducts = [
  { id: 'prod-1', name: 'Laptop Pro 14', price: 1800, category: 'Electrónica', stock: 24 },
  { id: 'prod-2', name: 'Impresora térmica', price: 640, category: 'Oficina', stock: 15 },
  { id: 'prod-3', name: 'Kit de herramientas', price: 290, category: 'Ferretería', stock: 42 },
  { id: 'prod-4', name: 'Silla ergonómica', price: 410, category: 'Hogar', stock: 12 },
];

export async function listProducts({ page = 1, limit = 12, q = '' } = {}) {
  const normalizedQuery = String(q).trim().toLowerCase();

  if (!supabase) {
    const filtered = normalizedQuery
      ? demoProducts.filter((product) => product.name.toLowerCase().includes(normalizedQuery))
      : demoProducts;

    return filtered.slice((page - 1) * limit, page * limit);
  }

  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    throw error;
  }

  const products = normalizedQuery
    ? data.filter((product) => String(product.name ?? '').toLowerCase().includes(normalizedQuery))
    : data;

  return products.slice((page - 1) * limit, page * limit);
}

export async function getProductById(productId) {
  if (!supabase) {
    return demoProducts.find((product) => product.id === productId) ?? null;
  }

  const { data, error } = await supabase.from('products').select('*').eq('id', productId).maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function searchProducts({ q = '', page = 1, limit = 12 } = {}) {
  return listProducts({ page, limit, q });
}
