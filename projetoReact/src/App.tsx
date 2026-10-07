import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Code-splitting: cada layout/página vira um chunk carregado sob demanda
const AppLayout = lazy(() => import('./layouts/AppLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const ProductsPage = lazy(() => import('./pages/public/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/public/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/public/CartPage'));
const LoginPage = lazy(() => import('./pages/public/LoginPage'));
const ManageProductsPage = lazy(() => import('./pages/admin/ManageProductsPage'));

const PageLoader = () => (
  <Center h="100vh">
    <Loader />
  </Center>
);

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Rotas publicas e layout */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/produtos/:id" element={<ProductDetailPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Rotas de admin protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<ManageProductsPage />} />
              </Route>
            </Route>

            {/* Se não encontrar redireciona para a página principal */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
