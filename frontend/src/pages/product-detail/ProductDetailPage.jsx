import { useParams } from 'react-router-dom';

const productMap = {
  'prod-1': { id: 'prod-1', name: 'Laptop Pro 14', price: 1800, description: 'Laptop de alto rendimiento para equipos de oficina y ventas.' },
  'prod-2': { id: 'prod-2', name: 'Impresora térmica', price: 640, description: 'Perfecta para tickets y documentos de punto de venta.' },
  'prod-3': { id: 'prod-3', name: 'Kit de herramientas', price: 290, description: 'Conjunto completo para mantenimiento y obra.' },
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = productMap[id] ?? productMap['prod-1'];

  return (
    <section className="card">
      <h2>{product.name}</h2>
      <p className="price">S/ {product.price}</p>
      <p>{product.description}</p>
      <button className="button primary" type="button">Agregar al carrito</button>
    </section>
  );
}
