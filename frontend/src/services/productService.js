import { apiClient } from './apiClient.js';

// Único lugar que conoce la forma de los productos del backend.
// Hoy la API devuelve { id, name, price, category, stock }. Si tu tabla `products` de Supabase usa
// otros nombres de columna, ajusta solo `normalizeProduct`.

function plain(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

function slug(text) {
  return plain(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// El backend no envía imagen ni ícono: se elige un dibujo según el nombre del producto.
const GLYPH_RULES = [
  [/laptop|portatil|notebook/, 'laptop'],
  [/multifunci/, 'mfp'],
  [/impresora/, 'printer'],
  [/monitor|pantalla/, 'monitor'],
  [/lector|escaner|codigo de barras/, 'scanner'],
  [/router|wi-?fi|switch/, 'router'],
  [/gaveta/, 'drawer'],
  [/silla|sillon/, 'chair'],
  [/herramienta|kit|taladro|martillo/, 'toolbox'],
];

function glyphFor(name) {
  const text = plain(name);
  return GLYPH_RULES.find(([pattern]) => pattern.test(text))?.[1] ?? 'box';
}

export function normalizeProduct(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const name = String(raw.name ?? '').trim();
  const price = Number(raw.price);
  const stock = Number(raw.stock);

  // Sin id, nombre o un precio válido no se muestra: un precio en blanco no debe venderse a S/ 0.
  if (raw.id == null || !name || raw.price == null || !Number.isFinite(price) || price < 0) return null;

  const category = String(raw.category ?? '').trim();

  return {
    id: String(raw.id),
    name,
    sku: raw.sku ? String(raw.sku) : null,
    category,
    categoryId: category ? slug(category) : '',
    price,
    stock: Number.isFinite(stock) && stock > 0 ? Math.floor(stock) : 0,
    description: raw.description ? String(raw.description) : '',
    glyph: glyphFor(name),
  };
}

// El backend limita a 100 productos por página (validators/products.validator.js).
export async function fetchProducts({ signal } = {}) {
  const payload = await apiClient('/products?page=1&limit=100', { signal });
  return (payload.data ?? []).map(normalizeProduct).filter(Boolean);
}

export async function fetchProduct(id, { signal } = {}) {
  const payload = await apiClient(`/products/${encodeURIComponent(id)}`, { signal });
  return normalizeProduct(payload.data);
}

// /categories del backend aún es un listado fijo que no coincide con los productos, así que se
// derivan de los productos cargados.
export function deriveCategories(products) {
  const seen = new Map();
  products.forEach((product) => {
    if (product.categoryId && !seen.has(product.categoryId)) {
      seen.set(product.categoryId, { id: product.categoryId, label: product.category });
    }
  });
  return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label, 'es'));
}
