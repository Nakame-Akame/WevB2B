import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { deriveCategories, fetchProducts } from '../services/productService.js';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', products: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, status: 'loading' }));

    fetchProducts({ signal: controller.signal })
      .then((products) => setState({ status: 'ready', products }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ status: 'error', products: [] });
      });

    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => setAttempt((count) => count + 1), []);

  const value = useMemo(
    () => ({ ...state, categories: deriveCategories(state.products), reload }),
    [state, reload],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts debe usarse dentro de ProductsProvider');
  return context;
}
