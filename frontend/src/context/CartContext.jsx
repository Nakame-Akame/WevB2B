import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { IGV_RATE, getProduct, round2, unitPriceFor } from '../data/products.js';

const STORAGE_KEY = 'facturapro.cart.v1';
const CartContext = createContext(null);

function clampQuantity(id, quantity) {
  const product = getProduct(id);
  if (!product) return 0;
  return Math.max(0, Math.min(Math.floor(quantity), product.stock));
}

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => ({ id: item.id, qty: clampQuantity(item.id, Number(item.qty)) }))
      .filter((item) => item.qty > 0);
  } catch {
    return [];
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const current = items.find((item) => item.id === action.id);
      const qty = clampQuantity(action.id, (current?.qty ?? 0) + action.qty);
      if (qty === 0) return items;
      return current
        ? items.map((item) => (item.id === action.id ? { ...item, qty } : item))
        : [...items, { id: action.id, qty }];
    }
    case 'set': {
      const qty = clampQuantity(action.id, action.qty);
      if (qty === 0) return items.filter((item) => item.id !== action.id);
      return items.map((item) => (item.id === action.id ? { ...item, qty } : item));
    }
    case 'remove':
      return items.filter((item) => item.id !== action.id);
    case 'clear':
      return [];
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

  const value = useMemo(() => {
    const lines = items.map(({ id, qty }) => {
      const product = getProduct(id);
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
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      listTotal,
      savings: round2(listTotal - subtotal),
      subtotal,
      igv,
      total: round2(subtotal + igv),
      add: (id, qty = 1) => dispatch({ type: 'add', id, qty }),
      setQuantity: (id, qty) => dispatch({ type: 'set', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}
