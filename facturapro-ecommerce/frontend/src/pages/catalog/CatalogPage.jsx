export default function CatalogPage() {
  const products = [
    { id: 'prod-1', name: 'Laptop Pro 14', price: 1800, stock: 24 },
    { id: 'prod-2', name: 'Impresora térmica', price: 640, stock: 15 },
    { id: 'prod-3', name: 'Kit de herramientas', price: 290, stock: 42 },
  ];

  return (
    <section>
      <h2>Catálogo</h2>
      <div className="grid products-grid">
        {products.map((product) => (
          <article key={product.id} className="card product-card">
            <h3>{product.name}</h3>
            <p>Precio: S/ {product.price}</p>
            <p>Stock: {product.stock}</p>
            <a href={`/product/${product.id}`} className="button primary">Comprar</a>
          </article>
        ))}
      </div>
    </section>
  );
}
