import { Link } from 'react-router-dom';
import ProductThumb from '../../components/ProductThumb.jsx';
import QuoteSheet from '../../components/QuoteSheet.jsx';
import { useProducts } from '../../context/ProductsContext.jsx';
import { VOLUME_TIERS, formatPEN, formatPercent } from '../../data/pricing.js';

export default function HomePage() {
  const { products, status } = useProducts();
  const featured = products.filter((product) => product.stock > 0).slice(0, 3);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <h1 id="hero-title">Equipos para tu empresa, con factura y precio por volumen</h1>
          <p className="lede">
            El mismo inventario y los mismos precios que tu sistema FacturaPro. Arma tu cotización aquí mismo y suma al pedido
            lo que necesites.
          </p>
          <div className="cta-row">
            <Link to="/catalog" className="btn">
              Ver catálogo
            </Link>
            <Link to="/b2b" className="btn btn--ghost">
              Abrir cuenta de empresa
            </Link>
          </div>
        </div>

        <QuoteSheet />
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="section-head">
          <h2 id="steps-title">Comprar con factura, en tres pasos</h2>
        </div>
        <ol className="steps">
          <li className="steps__item">
            <span className="steps__num" aria-hidden="true">
              1
            </span>
            <h3>Elige tus equipos</h3>
            <p className="muted">Ves el stock real y el precio por volumen antes de agregar al pedido.</p>
          </li>
          <li className="steps__item">
            <span className="steps__num" aria-hidden="true">
              2
            </span>
            <h3>Indica tus datos de facturación</h3>
            <p className="muted">Con tu RUC para factura, o con tu DNI para boleta.</p>
          </li>
          <li className="steps__item">
            <span className="steps__num" aria-hidden="true">
              3
            </span>
            <h3>Paga y sigue tu pedido</h3>
            <p className="muted">Ves el estado de cada pedido y tu comprobante en un solo lugar.</p>
          </li>
        </ol>
      </section>

      {status === 'loading' || featured.length > 0 ? (
        <section className="section" aria-labelledby="featured-title">
          <div className="section-head">
            <h2 id="featured-title">Algunos productos del catálogo</h2>
            <Link to="/catalog" className="link">
              Ver todo el catálogo
            </Link>
          </div>

          {status === 'loading' ? (
            <div className="featured" aria-hidden="true">
              {[0, 1, 2].map((slot) => (
                <div key={slot} className="featured__item">
                  <div className="ghost thumb-ghost" />
                  <div className="ghost ghost--price" />
                </div>
              ))}
            </div>
          ) : (
            <div className="featured">
              {featured.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="featured__item">
                  <ProductThumb glyph={product.glyph} large />
                  <div>
                    <p className="featured__name">{product.name}</p>
                    <p className="price">
                      {formatPEN(product.price)}
                      <span className="price__note">Precio unitario sin IGV</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section className="section split" aria-labelledby="volume-title">
        <div className="stack" style={{ '--stack': '1rem' }}>
          <h2 id="volume-title">Cuanto más compras de un producto, menos pagas por unidad</h2>
          <p className="lede">
            El descuento se aplica al precio de cada unidad del mismo producto y se actualiza mientras cambias la cantidad.
          </p>
          <Link to="/b2b" className="btn btn--ghost">
            Conocer las condiciones para empresas
          </Link>
        </div>
        <table className="tiers">
          <caption className="sr-only">Descuento por volumen según la cantidad de unidades de un mismo producto</caption>
          <thead>
            <tr>
              <th scope="col">Cantidad</th>
              <th scope="col" className="tiers__value">
                Descuento
              </th>
            </tr>
          </thead>
          <tbody>
            {VOLUME_TIERS.map((tier) => (
              <tr key={tier.min} className="tiers__row">
                <td>{tier.label}</td>
                <td className="tiers__value">{tier.discount > 0 ? formatPercent(tier.discount) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
