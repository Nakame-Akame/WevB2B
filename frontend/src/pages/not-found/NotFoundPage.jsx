import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="result" aria-labelledby="not-found-title">
      <p className="not-found__code" aria-hidden="true">
        404
      </p>
      <h1 id="not-found-title" className="page-head__title">
        No encontramos esa página
      </h1>
      <p className="lede">Revisa la dirección o vuelve al catálogo para seguir comprando.</p>
      <div className="cta-row">
        <Link to="/catalog" className="btn">
          Ver catálogo
        </Link>
        <Link to="/" className="btn btn--ghost">
          Ir al inicio
        </Link>
      </div>
    </section>
  );
}
