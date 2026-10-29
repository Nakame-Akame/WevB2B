import { IGV_RATE, formatPEN, formatPercent } from '../data/products.js';

export default function OrderSummary({ cart, children }) {
  return (
    <aside className="summary" aria-label="Resumen del pedido">
      <div className="sheet__holes" aria-hidden="true" />
      <div className="sheet__body">
        <h2 className="sheet__title">Resumen</h2>
        <dl className="ledger">
          <div className="ledger__row">
            <dt className="ledger__term">Precio de lista</dt>
            <dd className="ledger__value">{formatPEN(cart.listTotal)}</dd>
          </div>
          {cart.savings > 0 ? (
            <div className="ledger__row ledger__row--saving">
              <dt>Descuento por volumen</dt>
              <dd className="ledger__value">−{formatPEN(cart.savings)}</dd>
            </div>
          ) : null}
          <div className="ledger__row">
            <dt className="ledger__term">Subtotal</dt>
            <dd className="ledger__value">{formatPEN(cart.subtotal)}</dd>
          </div>
          <div className="ledger__row">
            <dt className="ledger__term">IGV ({formatPercent(IGV_RATE)})</dt>
            <dd className="ledger__value">{formatPEN(cart.igv)}</dd>
          </div>
          <div className="ledger__row ledger__row--total">
            <dt className="ledger__term">Total</dt>
            <dd className="ledger__value">{formatPEN(cart.total)}</dd>
          </div>
        </dl>
        {children ? <div style={{ marginTop: '1.25rem' }}>{children}</div> : null}
      </div>
    </aside>
  );
}
