import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuantityStepper from './QuantityStepper.jsx';
import { useCart } from '../context/CartContext.jsx';
import {
  IGV_RATE,
  PRODUCTS,
  formatPEN,
  formatPercent,
  getProduct,
  nextTierFor,
  round2,
  tierFor,
  unitPriceFor,
} from '../data/products.js';

const today = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

export default function QuoteSheet() {
  const { add } = useCart();
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState(10);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  const product = getProduct(productId);
  const tier = tierFor(quantity);
  const nextTier = nextTierFor(quantity);
  const unit = unitPriceFor(product, quantity);
  const listTotal = round2(product.price * quantity);
  const subtotal = round2(unit * quantity);
  const savings = round2(listTotal - subtotal);
  const igv = round2(subtotal * IGV_RATE);
  const total = round2(subtotal + igv);

  function changeProduct(event) {
    const next = getProduct(event.target.value);
    setProductId(next.id);
    setQuantity((current) => Math.min(current, next.stock));
  }

  function handleAdd() {
    add(product.id, quantity);
    setAdded(true);
  }

  return (
    <section className="sheet sheet--triplicate hero__quote" aria-labelledby="quote-title">
      <div className="sheet__holes" aria-hidden="true" />
      <div className="sheet__body">
        <div className="sheet__head">
          <div>
            <h2 id="quote-title" className="sheet__title">
              Cotización rápida
            </h2>
            <p className="muted small">{today}</p>
          </div>
          <span className="stamp stamp--land" aria-hidden="true">
            Cotizado
          </span>
        </div>

        <div className="quote-controls">
          <label className="field">
            Producto
            <select className="input" value={productId} onChange={changeProduct}>
              {PRODUCTS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="field">
            <span id="quote-qty">Cantidad</span>
            <QuantityStepper value={quantity} onChange={setQuantity} max={product.stock} label="Cantidad a cotizar" />
          </div>
        </div>

        <dl className="ledger" aria-live="polite">
          <div className="ledger__row print-in" style={{ '--i': 0 }}>
            <dt className="ledger__term">Precio de lista</dt>
            <dd className="ledger__value">{formatPEN(product.price)} c/u</dd>
          </div>
          <div className="ledger__row print-in" style={{ '--i': 1 }}>
            <dt className="ledger__term">Descuento por volumen</dt>
            <dd className="ledger__value">{tier.discount > 0 ? `−${formatPercent(tier.discount)}` : 'Sin descuento'}</dd>
          </div>
          <div className="ledger__row print-in" style={{ '--i': 2 }}>
            <dt className="ledger__term">Tu precio</dt>
            <dd className="ledger__value">{formatPEN(unit)} c/u</dd>
          </div>
          <div className="ledger__row print-in" style={{ '--i': 3 }}>
            <dt className="ledger__term">Subtotal</dt>
            <dd className="ledger__value">{formatPEN(subtotal)}</dd>
          </div>
          {savings > 0 ? (
            <div className="ledger__row ledger__row--saving">
              <dt>Ahorras</dt>
              <dd className="ledger__value">{formatPEN(savings)}</dd>
            </div>
          ) : null}
          <div className="ledger__row print-in" style={{ '--i': 4 }}>
            <dt className="ledger__term">IGV ({formatPercent(IGV_RATE)})</dt>
            <dd className="ledger__value">{formatPEN(igv)}</dd>
          </div>
          <div className="ledger__row ledger__row--total print-in" style={{ '--i': 5 }}>
            <dt className="ledger__term">Total</dt>
            <dd className="ledger__value">{formatPEN(total)}</dd>
          </div>
        </dl>

        {nextTier && nextTier.min <= product.stock ? (
          <p className="hint" style={{ marginTop: '1.25rem' }}>
            Con {nextTier.min - quantity} {nextTier.min - quantity === 1 ? 'unidad' : 'unidades'} más el descuento sube a{' '}
            {formatPercent(nextTier.discount)}.
          </p>
        ) : null}

        <div className="cta-row" style={{ marginTop: '1.25rem' }}>
          <button type="button" className={added ? 'btn is-done' : 'btn'} onClick={handleAdd}>
            {added ? 'Agregado al pedido' : 'Agregar al pedido'}
          </button>
          <Link to="/b2b" className="btn btn--ghost">
            Pedir cotización formal
          </Link>
        </div>
      </div>
    </section>
  );
}
