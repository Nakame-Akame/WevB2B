import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

const links = [
  { to: '/catalog', label: 'Catálogo' },
  { to: '/b2b', label: 'Empresas' },
  { to: '/orders', label: 'Pedidos' },
  { to: '/auth', label: 'Ingresar' },
];

function navClass({ isActive }) {
  return isActive ? 'nav__link is-active' : 'nav__link';
}

export default function Layout() {
  const { count } = useCart();

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="site-header">
        <div className="container site-header__row">
          <Link to="/" className="brand" aria-label="FacturaPro Tienda, ir al inicio">
            <svg className="brand__mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M6 3h14l6 6v20H6z" fill="currentColor" />
              <path d="M20 3v6h6" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
              <path d="M11 15h10M11 20h10M11 25h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>
              FacturaPro <span className="brand__suffix">Tienda</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Principal">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/cart" className={navClass}>
              Mi pedido
              <span className="cart-count" aria-label={`${count} ${count === 1 ? 'producto' : 'productos'} en tu pedido`}>
                {count}
              </span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="contenido" className="container main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__grid">
            <div>
              <p className="site-footer__title">FacturaPro Tienda</p>
              <p>
                Compra con el mismo inventario y los mismos precios de tu sistema FacturaPro. Comprobante electrónico en
                cada pedido.
              </p>
            </div>
            <div>
              <p className="site-footer__title">Comprar</p>
              <ul className="site-footer__list">
                <li>
                  <Link to="/catalog">Catálogo</Link>
                </li>
                <li>
                  <Link to="/cart">Mi pedido</Link>
                </li>
                <li>
                  <Link to="/orders">Seguimiento de pedidos</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="site-footer__title">Empresas</p>
              <ul className="site-footer__list">
                <li>
                  <Link to="/b2b">Precios por volumen y crédito</Link>
                </li>
                <li>
                  <Link to="/account">Mi cuenta</Link>
                </li>
                <li>
                  <Link to="/legal">Términos y privacidad</Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="site-footer__base">FacturaPro © 2026. Precios en soles (S/) y sin IGV hasta el resumen del pedido.</p>
        </div>
      </footer>

      <ScrollRestoration />
    </>
  );
}
