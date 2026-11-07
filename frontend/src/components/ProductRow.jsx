import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductThumb from './ProductThumb.jsx';
import QuantityStepper from './QuantityStepper.jsx';
import { useCart } from '../context/CartContext.jsx';
import { LOW_STOCK_LIMIT, VOLUME_TIERS, formatPEN, unitPriceFor } from '../data/pricing.js';

export function ProductRowGhost() {
  return (
    <li className="row" aria-hidden="true">
      <div className="ghost thumb-ghost" />
      <div className="row__info">
        <div className="ghost ghost--title" />
      </div>
      <div className="row__meta">
        <div className="ghost" />
        <div className="ghost ghost--price" />
      </div>
      <div className="row__buy">
        <div className="ghost ghost--buy" />
      </div>
    </li>
  );
}

export default function ProductRow({ product }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  const soldOut = product.stock === 0;
  const lowStock = !soldOut && product.stock <= LOW_STOCK_LIMIT;
  // Solo se anuncia el descuento más alto que el stock permite alcanzar.
  const bestTier = [...VOLUME_TIERS].reverse().find((tier) => tier.discount > 0 && tier.min <= product.stock);

  function handleAdd() {
    add(product, quantity);
    setAdded(true);
  }

  return (
    <li className="row">
      <ProductThumb glyph={product.glyph} />

      <div className="row__info">
        <Link to={`/product/${product.id}`} className="row__name">
          {product.name}
        </Link>
        <p className="row__sku">{product.sku ? `Código ${product.sku}` : product.category}</p>
      </div>

      <div className="row__meta">
        <p className={soldOut || lowStock ? 'row__stock is-low' : 'row__stock'}>
          {soldOut ? 'Agotado' : lowStock ? `Quedan ${product.stock}` : `${product.stock} disponibles`}
        </p>
        <p className="price">
          {formatPEN(product.price)}
          {bestTier ? (
            <span className="price__note">
              {formatPEN(unitPriceFor(product, bestTier.min))} c/u desde {bestTier.min} unidades
            </span>
          ) : null}
        </p>
      </div>

      <div className="row__buy">
        {soldOut ? (
          <button type="button" className="btn btn--small" disabled>
            Agotado
          </button>
        ) : (
          <>
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              max={product.stock}
              label={`Cantidad de ${product.name}`}
            />
            <button type="button" className={added ? 'btn btn--small is-done' : 'btn btn--small'} onClick={handleAdd}>
              {added ? 'Agregado' : 'Agregar al pedido'}
            </button>
          </>
        )}
        <span className="sr-only" role="status">
          {added ? `${product.name} agregado al pedido` : ''}
        </span>
      </div>
    </li>
  );
}
