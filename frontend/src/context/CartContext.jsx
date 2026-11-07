import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { IGV_RATE, round2, unitPriceFor } from '../data/pricing.js';

const STORAGE_KEY = 'facturapro.cart.v2';
const LEGACY_KEY = 'facturapro.cart.v1';
const CartContext = createContext(null);

// Cada línea guarda una copia del producto tal como se vio al agregarlo, para que el pedido no
// dependa de que el catálogo ya esté cargado. `sync` la actualiza con los datos vigentes.
function toSnapshot(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const price = Number(raw.price);
  const stock = Number(raw.stock);
  if (!raw.id || !raw.name || !Number.isFinite(price) || price < 0 || !Number.isFinite(stock)) return null;

  return {
    id: String(raw.id),
    name: String(raw.name),
    sku: raw.sku ? String(raw.sku) : null,
    category: raw.category ? String(raw.category) : '',
    price,
    stock: Math.max(0, Math.floor(stock)),
    glyph: raw.glyph ? String(raw.glyph) : 'box',
  };
}

// Con stock 0 se conserva la cantidad: la página del pedido avisa y pide quitar el producto.
function fitQuantity(quantity, stock) {
  return stock > 0 ? Math.min(quantity, stock) : quantity;
}

function load() {
  try {
    localStorage.removeItem(LEGACY_KEY);
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((item) => {
      const product = toSnapshot(item?.product);
      const qty = Math.floor(Number(item?.qty));
      if (!product || !(qty > 0)) return [];
      return [{ id: product.id, qty: fitQuantity(qty, product.stock), product }];
    });
  } catch {
    return [];
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const product = toSnapshot(action.product);
      if (!product || product.stock === 0) return items;

      const current = items.find((item) => item.id === product.id);
      const qty = Math.min((current?.qty ?? 0) + action.qty, product.stock);
      if (!(qty > 0)) return items;

      const line = { id: product.id, qty, product };
      return current ? items.map((item) => (item.id === product.id ? line : item)) : [...items, line];
    }
    case 'set': {
      const qty = Math.floor(action.qty);
      if (!(qty > 0)) return items.filter((item) => item.id !== action.id);
      return items.map((item) =>
        item.id === action.id ? { ...item, qty: fitQuantity(qty, item.product.stock) } : item,
      );
    }
    case 'remove':
      return items.filter((item) => item.id !== action.id);
    case 'clear':
      return [];
    case 'sync': {
      // Actualiza precio y stock con el catálogo vigente. Los productos que no aparecen en la
      // lista se dejan como están: el catálogo carga hasta 100 y el servidor valida al crear el pedido.
      const byId = new Map(action.products.map((product) => [product.id, product]));
      let changed = false;

      const next = items.map((item) => {
        const fresh = toSnapshot(byId.get(item.id));
        if (!fresh) return item;

        const qty = fitQuantity(item.qty, fresh.stock);
        if (qty === item.qty && JSON.stringify(fresh) === JSON.stringify(item.product)) return item;

        changed = true;
        return { id: item.id, qty, product: fresh };
      });

      return changed ? next : items;
    }
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Sin almacenamiento disponible: el pedido vive solo en esta sesión.
    }
  }, [items]);

  // Funciones estables: no cambian cuando cambia el contenido del pedido.
  const actions = useMemo(
    () => ({
      add: (product, qty = 1) => dispatch({ type: 'add', product, qty }),
      setQuantity: (id, qty) => dispatch({ type: 'set', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
      sync: (products) => dispatch({ type: 'sync', products }),
    }),
    [],
  );

  const value = useMemo(() => {
    const lines = items.map(({ qty, product }) => {
      const unit = unitPriceFor(product, qty);
      return {
        product,
        qty,
        unit,
        total: round2(unit * qty),
        listTotal: round2(product.price * qty),
      };
    });

    const subtotal = round2(lines.reduce((sum, line) => sum + line.total, 0));
    const listTotal = round2(lines.reduce((sum, line) => sum + line.listTotal, 0));
    const igv = round2(subtotal * IGV_RATE);

    return {
      ...actions,
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      listTotal,
      savings: round2(listTotal - subtotal),
      subtotal,
      igv,
      total: round2(subtotal + igv),
    };
  }, [items, actions]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}
