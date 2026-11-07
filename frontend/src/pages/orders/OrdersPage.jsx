import PageHead from '../../components/PageHead.jsx';
import { formatPEN } from '../../data/pricing.js';

const STAGES = ['Recibido', 'En preparación', 'En tránsito', 'Entregado'];

// TODO: reemplazar por GET /orders cuando el backend esté conectado.
const orders = [
  { id: '0001', date: '22 de octubre de 2026', summary: 'Laptop Pro 14 y Impresora térmica', total: 2879.2, stage: 1 },
  { id: '0002', date: '25 de octubre de 2026', summary: '10 × Kit de herramientas', total: 3148.24, stage: 2 },
];

export default function OrdersPage() {
  return (
    <>
      <PageHead title="Mis pedidos">Sigue cada pedido desde que lo recibimos hasta que llega a tu puerta.</PageHead>

      <ul>
        {orders.map((order) => (
          <li key={order.id} className="order">
            <div className="order__head">
              <div>
                <h2 className="order__title">Pedido {order.id}</h2>
                <p className="muted">
                  {order.date} · {order.summary}
                </p>
              </div>
              <p className="price">
                {formatPEN(order.total)}
                <span className="price__note">Total con IGV</span>
              </p>
            </div>

            <ol className="track" aria-label={`Estado del pedido ${order.id}`}>
              {STAGES.map((stage, index) => {
                const className = [
                  'track__step',
                  index <= order.stage ? 'is-done' : '',
                  index === order.stage ? 'is-current' : '',
                ]
                  .join(' ')
                  .trim();
                return (
                  <li key={stage} className={className} aria-current={index === order.stage ? 'step' : undefined}>
                    {stage}
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ul>
    </>
  );
}
