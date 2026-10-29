import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead.jsx';
import ProductThumb from '../../components/ProductThumb.jsx';
import QuantityStepper from '../../components/QuantityStepper.jsx';
import OrderSummary from '../../components/OrderSummary.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { formatPEN, formatPercent, nextTierFor, tierFor } from '../../data/products.js';

export default function CartPage() {
  const cart = useCart();

  if (cart.lines.length === 0) {
    return (
      <>
        <PageHead title="Mi pedido" />
        <div className="empty">
          <h2>Tu pedido está vacío</h2>
          <p className="muted">Agrega productos desde el catálogo y aquí verás el total con IGV.</p>
          <Link to="/catalog" className="btn">
            Ver catálogo
          </Link>
        </div>
      </>
    );
  }

  const nudge = cart.lines
    .map((line) => ({ line, next: nextTierFor(line.qty) }))
    .find(({ line, next }) => next && next.min <= line.product.stock && next.min - line.qty <= 3);

  return (
    <>
      <PageHead title="Mi pedido">Revisa cantidades y descuentos antes de pasar al pago.</PageHead>

      <div className="split split--wide-left">
        <div className="stack" style={{ '--stack': '1.25rem' }}>
          {nudge ? (
            <p className="hint">
              Agrega {nudge.next.min - nudge.line.qty} {nudge.next.min - nudge.line.qty === 1 ? 'unidad' : 'unidades'} más de{' '}
              {nudge.line.product.name} y el descuento sube a {formatPercent(nudge.next.discount)}.
            </p>
          ) : null}

          <ul className="cart-lines">
            {cart.lines.map((line) => {
              const tier = tierFor(line.qty);
              return (
                <li key={line.product.id} className="cart-line">
                  <ProductThumb glyph={line.product.glyph} />
                  <div className="cart-line__body">
                    <Link to={`/product/${line.product.id}`} className="row__name">
                      {line.product.name}
                    </Link>
                    <p className="muted small">
                      {formatPEN(line.unit)} c/u
                      {tier.discount > 0 ? ` · ${formatPercent(tier.discount)} de descuento por volumen` : ''}
                    </p>
                  </div>
                  <div className="cart-line__controls">
                    <QuantityStepper
                      value={line.qty}
                      onChange={(qty) => cart.setQuantity(line.product.id, qty)}
                      max={line.product.stock}
                      label={`Cantidad de ${line.product.name}`}
                    />
                    <p className="cart-line__total">{formatPEN(line.total)}</p>
                    <button type="button" className="link-button" onClick={() => cart.remove(line.product.id)}>
                      Quitar
                      <span className="sr-only"> {line.product.name}</span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link to="/catalog" className="link">
            Seguir comprando
          </Link>
        </div>

        <OrderSummary cart={cart}>
          <Link to="/checkout" className="btn btn--block">
            Continuar al pago
          </Link>
        </OrderSummary>
      </div>
    </>
  );
}
