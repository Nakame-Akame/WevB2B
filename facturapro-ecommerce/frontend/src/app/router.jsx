import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage.jsx';
import CatalogPage from '../pages/catalog/CatalogPage.jsx';
import ProductDetailPage from '../pages/product-detail/ProductDetailPage.jsx';
import CartPage from '../pages/cart/CartPage.jsx';
import CheckoutPage from '../pages/checkout/CheckoutPage.jsx';
import AuthPage from '../pages/auth/AuthPage.jsx';
import AccountPage from '../pages/account/AccountPage.jsx';
import OrdersPage from '../pages/orders/OrdersPage.jsx';
import B2BPage from '../pages/b2b/B2BPage.jsx';
import PaymentResultPage from '../pages/payment-result/PaymentResultPage.jsx';
import LegalPage from '../pages/legal/LegalPage.jsx';
import NotFoundPage from '../pages/not-found/NotFoundPage.jsx';
import Layout from '../components/layout/Layout.jsx';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/catalog', element: <CatalogPage /> },
      { path: '/product/:id', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/auth', element: <AuthPage /> },
      { path: '/account', element: <AccountPage /> },
      { path: '/orders', element: <OrdersPage /> },
      { path: '/b2b', element: <B2BPage /> },
      { path: '/payment-result', element: <PaymentResultPage /> },
      { path: '/legal', element: <LegalPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
