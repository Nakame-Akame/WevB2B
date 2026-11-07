import { useCallback, useEffect, useState } from 'react';
import { fetchProduct } from '../services/productService.js';

// status: 'loading' | 'ready' | 'notfound' | 'error'
export function useProduct(id) {
  const [state, setState] = useState({ status: 'loading', product: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', product: null });

    fetchProduct(id, { signal: controller.signal })
      .then((product) => setState(product ? { status: 'ready', product } : { status: 'notfound', product: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ status: error.status === 404 ? 'notfound' : 'error', product: null });
      });

    return () => controller.abort();
  }, [id, attempt]);

  const reload = useCallback(() => setAttempt((count) => count + 1), []);

  return { ...state, reload };
}
