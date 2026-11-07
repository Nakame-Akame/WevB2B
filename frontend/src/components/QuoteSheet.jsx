import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadError from './LoadError.jsx';
import QuantityStepper from './QuantityStepper.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { IGV_RATE, formatPEN, formatPercent, nextTierFor, round2, tierFor, unitPriceFor } from '../data/pricing.js';

const today = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

function QuoteCalculator({ products }) {
  const { add } = useCart();
  const [productId, setProductId] = useState(products[0].id);
  const [quantity, setQuantity] = useState(10);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  const product = products.find((item) => item.id === productId) ?? products[0];
  // La cantidad nunca supera el stock del producto elegido.
  const qty = Math.min(quantity, product.stock);

  const tier = tierFor(qty);
  const nextTier = nextTierFor(qty);
  const unit = unitPriceFor(product, qty);
  const listTotal = round2(product.price * qty);
  const subtotal = round2(unit * qty);
  const savings = round2(listTotal - subtotal);
  const igv = round2(subtotal * IGV_RATE);
  const total = round2(subtotal + igv);

  function handleAdd() {
    add(product, qty);
    setAdded(true);
  }

  return (
    <>
      <div className="quote-controls">
        <label className="field">
          Producto
          <select className="input" value={product.id} onChange={(event) => setProductId(event.target.value)}>
            {products.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <div className="field">
          <span>Cantidad</span>
          <QuantityStepper value={qty} onChange={setQuantity} max={product.stock} label="Cantidad a cotizar" />
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
          Con {nextTier.min - qty} {nextTier.min - qty === 1 ? 'unidad' : 'unidades'} más el descuento sube a{' '}
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
    </>
  );
}

export default function QuoteSheet() {
  const { products, status, reload } = useProducts();
  const available = useMemo(() => products.filter((product) => product.stock > 0), [products]);
  const ready = status === 'ready' && available.length > 0;

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
          {ready ? (
            <span className="stamp stamp--land" aria-hidden="true">
              Cotizado
            </span>
          ) : null}
        </div>

        {status === 'loading' ? (
          <div className="stack" style={{ '--stack': '0.9rem' }} aria-busy="true">
            <p className="muted" role="status">
              Cargando precios…
            </p>
            <div className="ghost ghost--buy" />
            <div className="ghost ghost--buy" />
            <div className="ghost ghost--price" />
          </div>
        ) : null}

        {status === 'error' ? <LoadError title="No pudimos cargar los precios" onRetry={reload} /> : null}

        {status === 'ready' && available.length === 0 ? (
          <div className="stack" style={{ '--stack': '1rem' }}>
            <p>Por ahora no hay productos con stock para cotizar.</p>
            <Link to="/catalog" className="btn btn--ghost">
              Ver catálogo
            </Link>
          </div>
        ) : null}

        {ready ? <QuoteCalculator products={available} /> : null}
      </div>
    </section>
  );
}
