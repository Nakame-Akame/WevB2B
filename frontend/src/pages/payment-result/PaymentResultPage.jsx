import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

export default function PaymentResultPage() {
  const [params] = useSearchParams();
  const status = params.get('status');
  const { clear } = useCart();

  useEffect(() => {
    if (status === 'ok') clear();
    // clear es estable por sesión; solo reaccionamos al estado del pago.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === 'ok') {
    return (
      <section className="result" aria-labelledby="result-title">
        <span className="stamp stamp--ok">Pagado</span>
        <h1 id="result-title" className="page-head__title">
          Recibimos tu pago
        </h1>
        <p className="lede">Te enviamos el comprobante por correo. Puedes seguir el estado de tu pedido en cualquier momento.</p>
        <div className="cta-row">
          <Link to="/orders" className="btn">
            Ver mis pedidos
          </Link>
          <Link to="/catalog" className="btn btn--ghost">
            Seguir comprando
          </Link>
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className="result" aria-labelledby="result-title">
        <span className="stamp">Rechazado</span>
        <h1 id="result-title" className="page-head__title">
          No pudimos procesar el pago
        </h1>
        <p className="lede">No se hizo ningún cobro. Revisa los datos de tu tarjeta o prueba con otro medio de pago.</p>
        <div className="cta-row">
          <Link to="/checkout" className="btn">
            Volver a intentar
          </Link>
          <Link to="/cart" className="btn btn--ghost">
            Revisar mi pedido
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="result" aria-labelledby="result-title">
      <h1 id="result-title" className="page-head__title">
        No hay un pago reciente
      </h1>
      <p className="lede">Aquí verás el resultado cuando termines de pagar un pedido.</p>
      <Link to="/cart" className="btn">
        Ir a mi pedido
      </Link>
    </section>
  );
}
