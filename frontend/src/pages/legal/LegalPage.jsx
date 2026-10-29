import PageHead from '../../components/PageHead.jsx';

export default function LegalPage() {
  return (
    <>
      <PageHead title="Términos y privacidad">Información legal y condiciones de uso de la tienda.</PageHead>

      <div className="prose">
        <h2 id="terminos">Términos de uso</h2>
        <p className="muted">Aquí se publicarán las condiciones de compra, entrega y garantía.</p>

        <h2 id="privacidad">Política de privacidad</h2>
        <p className="muted">Aquí se publicará cómo usamos y protegemos los datos de tus pedidos y tu facturación.</p>
      </div>
    </>
  );
}
