import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductThumb from './ProductThumb.jsx';
import QuantityStepper from './QuantityStepper.jsx';
import { useCart } from '../context/CartContext.jsx';
import { LOW_STOCK_LIMIT, VOLUME_TIERS, formatPEN, unitPriceFor } from '../data/products.js';

export default function ProductRow({ product }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  const lowStock = product.stock <= LOW_STOCK_LIMIT;
  const bestTier = VOLUME_TIERS[VOLUME_TIERS.length - 1];
  const bulkPrice = unitPriceFor(product, bestTier.min);

  function handleAdd() {
    add(product.id, quantity);
    setAdded(true);
  }

  return (
    <li className="row">
      <ProductThumb glyph={product.glyph} />

      <div className="row__info">
        <Link to={`/product/${product.id}`} className="row__name">
          {product.name}
        </Link>
        <p className="row__sku">Código {product.sku}</p>
      </div>

      <div className="row__meta">
        <p className={lowStock ? 'row__stock is-low' : 'row__stock'}>
          {lowStock ? `Quedan ${product.stock}` : `${product.stock} disponibles`}
        </p>
        <p className="price">
          {formatPEN(product.price)}
          <span className="price__note">
            {formatPEN(bulkPrice)} c/u desde {bestTier.min} unidades
          </span>
        </p>
      </div>

      <div className="row__buy">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          max={product.stock}
          label={`Cantidad de ${product.name}`}
        />
        <button type="button" className={added ? 'btn btn--small is-done' : 'btn btn--small'} onClick={handleAdd}>
          {added ? 'Agregado' : 'Agregar al pedido'}
        </button>
        <span className="sr-only" role="status">
          {added ? `${product.name} agregado al pedido` : ''}
        </span>
      </div>
    </li>
  );
}
