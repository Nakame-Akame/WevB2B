import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router.jsx';
import { CartProvider, useCart } from './context/CartContext.jsx';
import { ProductsProvider, useProducts } from './context/ProductsContext.jsx';

// Cuando el catálogo carga, pone al día precio y stock de lo que ya está en el pedido.
function CartSync() {
  const { products, status } = useProducts();
  const { sync } = useCart();

  useEffect(() => {
    if (status === 'ready') sync(products);
  }, [status, products, sync]);

  return null;
}

export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <CartSync />
        <RouterProvider router={router} />
      </CartProvider>
    </ProductsProvider>
  );
}
