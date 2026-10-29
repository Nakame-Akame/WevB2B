import { Link } from 'react-router-dom';

const featured = [
  { id: 'prod-1', name: 'Laptop Pro 14', price: 1800 },
  { id: 'prod-2', name: 'Impresora térmica', price: 640 },
  { id: 'prod-3', name: 'Kit de herramientas', price: 290 },
];

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <div>
          <span className="eyebrow">Nuevo catálogo</span>
          <h1>Compra con la misma fuente de verdad de FacturaPro</h1>
          <p>Sin duplicar inventario, con precios B2B y B2C integrados y pedidos reales.</p>
          <div className="cta-row">
            <Link to="/catalog" className="button primary">Ver catálogo</Link>
            <Link to="/b2b" className="button secondary">Cotización B2B</Link>
          </div>
        </div>
      </section>

      <section className="grid products-grid">
        {featured.map((product) => (
          <article key={product.id} className="card product-card">
            <h3>{product.name}</h3>
            <p>S/ {product.price}</p>
            <Link to={`/product/${product.id}`} className="button tertiary">Ver detalles</Link>
          </article>
        ))}
      </section>
    </div>
  );
}
