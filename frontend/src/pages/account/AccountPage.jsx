import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead.jsx';

// TODO: mostrar los datos reales del cliente cuando exista sesión (GET /customers/me).
const sections = [
  { term: 'Datos de facturación', detail: 'RUC o DNI, razón social y dirección fiscal. Aún sin completar.' },
  { term: 'Comprobantes', detail: 'Tus facturas y boletas aparecen aquí cuando pagas un pedido.' },
  { term: 'Preferencias', detail: 'Correo y teléfono de contacto para avisos de envío.' },
];

export default function AccountPage() {
  return (
    <>
      <PageHead title="Mi cuenta">Tus datos de facturación, tus comprobantes y tus preferencias.</PageHead>

      <div className="split split--wide-left">
        <dl className="data-list">
          {sections.map((section) => (
            <div key={section.term} className="data-list__row">
              <dt className="data-list__term">{section.term}</dt>
              <dd className="muted">{section.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="empty">
          <h2>Ingresa para ver tu cuenta</h2>
          <p className="muted">Aún no iniciaste sesión en este dispositivo.</p>
          <div className="cta-row">
            <Link to="/auth" className="btn">
              Ingresar
            </Link>
            <Link to="/orders" className="btn btn--ghost">
              Ver mis pedidos
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
