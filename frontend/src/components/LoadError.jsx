export default function LoadError({ title = 'No pudimos cargar los productos', onRetry }) {
  return (
    <div className="empty" role="alert">
      <h2>{title}</h2>
      <p className="muted">Revisa tu conexión e intenta de nuevo.</p>
      <button type="button" className="btn btn--ghost" onClick={onRetry}>
        Reintentar
      </button>
    </div>
  );
}
