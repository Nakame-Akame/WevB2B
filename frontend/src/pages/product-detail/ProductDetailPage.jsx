import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductThumb from '../../components/ProductThumb.jsx';
import QuantityStepper from '../../components/QuantityStepper.jsx';
import { useCart } from '../../context/CartContext.jsx';
import {
  CATEGORIES,
  LOW_STOCK_LIMIT,
  VOLUME_TIERS,
  formatPEN,
  formatPercent,
  getProduct,
  tierFor,
  unitPriceFor,
} from '../../data/products.js';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProduct(id);
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

  if (!product) {
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

  const category = CATEGORIES.find((item) => item.id === product.category);
  const currentTier = tierFor(quantity);
  const unit = unitPriceFor(product, quantity);
  const lowStock = product.stock <= LOW_STOCK_LIMIT;

  function handleAdd() {
    add(product.id, quantity);
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
            <p className="muted">
              Código {product.sku} · {category?.label}
            </p>
          </div>

          <p className="lede">{product.description}</p>

          <div>
            <p className="price">
              {formatPEN(unit)}
              <span className="price__note">
                Precio unitario sin IGV
                {currentTier.discount > 0 ? ` · ${formatPercent(currentTier.discount)} de descuento por volumen` : ''}
              </span>
            </p>
          </div>

          <div className="detail__buy">
            <QuantityStepper value={quantity} onChange={setQuantity} max={product.stock} label={`Cantidad de ${product.name}`} />
            <button type="button" className={added ? 'btn is-done' : 'btn'} onClick={handleAdd}>
              {added ? 'Agregado al pedido' : 'Agregar al pedido'}
            </button>
            <Link to="/cart" className="link">
              Ver mi pedido
            </Link>
          </div>
          <p className={lowStock ? 'small row__stock is-low' : 'small muted'} role="status">
            {added ? 'Producto agregado a tu pedido.' : lowStock ? `Quedan ${product.stock} unidades.` : `${product.stock} unidades disponibles.`}
          </p>

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
              {VOLUME_TIERS.map((tier) => (
                <tr key={tier.min} className={tier.min === currentTier.min ? 'tiers__row is-current' : 'tiers__row'}>
                  <td>{tier.label}</td>
                  <td className="tiers__value">{formatPEN(unitPriceFor(product, tier.min))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="specs">
            {product.specs.map(([term, value]) => (
              <div key={term} className="specs__row">
                <dt className="specs__term">{term}</dt>
                <dd className="specs__value">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
