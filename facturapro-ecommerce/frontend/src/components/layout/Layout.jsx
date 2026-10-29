import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <Link to="/" className="brand">FacturaPro</Link>
          <nav className="nav-links">
            <Link to="/catalog">Catálogo</Link>
            <Link to="/b2b">B2B</Link>
            <Link to="/orders">Pedidos</Link>
            <Link to="/cart">Carrito</Link>
            <Link to="/auth">Ingresar</Link>
          </nav>
        </div>
      </header>

      <main className="container page-shell">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <p>FacturaPro © 2026</p>
          <Link to="/legal">Términos y privacidad</Link>
        </div>
      </footer>
    </>
  );
}
