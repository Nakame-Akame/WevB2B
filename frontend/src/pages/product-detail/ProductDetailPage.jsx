import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadError from '../../components/LoadError.jsx';
import ProductThumb from '../../components/ProductThumb.jsx';
import QuantityStepper from '../../components/QuantityStepper.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { LOW_STOCK_LIMIT, VOLUME_TIERS, formatPEN, formatPercent, tierFor, unitPriceFor } from '../../data/pricing.js';
import { useProduct } from '../../hooks/useProduct.js';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { status, product, reload } = useProduct(id);
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [id]);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  if (status === 'loading') {
    return (
      <div className="detail" aria-busy="true">
        <span className="sr-only" role="status">
          Cargando producto…
        </span>
        <div className="ghost thumb-ghost" />
        <div className="stack" style={{ '--stack': '1rem' }}>
          <div className="ghost ghost--heading" />
          <div className="ghost ghost--title" />
          <div className="ghost ghost--price" />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return <LoadError title="No pudimos cargar el producto" onRetry={reload} />;
  }

  if (status === 'notfound') {
    return (
      <div className="empty">
        <h1 className="page-head__title">No encontramos ese producto</h1>
        <p className="muted">Puede que ya no esté en el catálogo o que la dirección esté incompleta.</p>
        <Link to="/catalog" className="btn">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const soldOut = product.stock === 0;
  const lowStock = !soldOut && product.stock <= LOW_STOCK_LIMIT;
  const qty = Math.min(quantity, Math.max(product.stock, 1));
  const currentTier = tierFor(qty);
  const unit = unitPriceFor(product, qty);
  // Solo se listan los tramos que el stock permite alcanzar.
  const reachableTiers = VOLUME_TIERS.filter((tier) => tier.min <= product.stock);

  function handleAdd() {
    add(product, qty);
    setAdded(true);
  }

  return (
    <>
      <nav className="crumbs" aria-label="Ruta de navegación">
        <Link to="/catalog" className="crumbs__link">
          Catálogo
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="detail">
        <ProductThumb glyph={product.glyph} large />

        <div className="stack" style={{ '--stack': '1.5rem' }}>
          <div className="stack" style={{ '--stack': '0.5rem' }}>
            <h1 className="page-head__title">{product.name}</h1>
            {product.category ? <p className="muted">{product.category}</p> : null}
            {product.sku ? <p className="muted small">Código {product.sku}</p> : null}
          </div>

          {product.description ? <p className="lede">{product.description}</p> : null}

          <p className="price">
            {formatPEN(unit)}
            <span className="price__note">
              Precio unitario sin IGV
              {currentTier.discount > 0 ? `, con ${formatPercent(currentTier.discount)} de descuento por volumen` : ''}
            </span>
          </p>

          <div className="detail__buy">
            {soldOut ? (
              <button type="button" className="btn" disabled>
                Agotado
              </button>
            ) : (
              <>
                <QuantityStepper value={qty} onChange={setQuantity} max={product.stock} label={`Cantidad de ${product.name}`} />
                <button type="button" className={added ? 'btn is-done' : 'btn'} onClick={handleAdd}>
                  {added ? 'Agregado al pedido' : 'Agregar al pedido'}
                </button>
              </>
            )}
            <Link to="/cart" className="link">
              Ver mi pedido
            </Link>
          </div>
          <p className={soldOut || lowStock ? 'small row__stock is-low' : 'small muted'} role="status">
            {added
              ? 'Producto agregado a tu pedido.'
              : soldOut
                ? 'Sin stock por ahora.'
                : lowStock
                  ? `Quedan ${product.stock} unidades.`
                  : `${product.stock} unidades disponibles.`}
          </p>

          {reachableTiers.length > 1 ? (
            <table className="tiers">
              <caption className="sr-only">Precio por unidad según la cantidad</caption>
              <thead>
                <tr>
                  <th scope="col">Cantidad</th>
                  <th scope="col" className="tiers__value">
                    Precio por unidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {reachableTiers.map((tier) => (
                  <tr key={tier.min} className={tier.min === currentTier.min ? 'tiers__row is-current' : 'tiers__row'}>
                    <td>{tier.label}</td>
                    <td className="tiers__value">{formatPEN(unitPriceFor(product, tier.min))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </>
  );
}
