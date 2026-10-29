import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead.jsx';
import { VOLUME_TIERS, formatPercent } from '../../data/products.js';

export default function B2BPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: enviar la solicitud al backend (por ejemplo POST /customers/b2b-requests).
    setSent(true);
  }

  return (
    <>
      <PageHead title="Compras para empresas">
        Precios por volumen, condiciones de crédito y cotización formal para equipos de compras.
      </PageHead>

      <div className="split split--wide-left">
        <div className="stack" style={{ '--stack': '2.5rem' }}>
          <div className="benefits">
            <div className="benefit">
              <h2>Precio por volumen</h2>
              <p className="muted">
                El descuento se aplica a cada unidad del mismo producto y lo ves en el catálogo antes de comprar.
              </p>
            </div>
            <div className="benefit">
              <h2>Crédito para tu empresa</h2>
              <p className="muted">
                Puedes solicitar condiciones de crédito. Las evaluamos con los datos de tu empresa y te respondemos por correo.
              </p>
            </div>
            <div className="benefit">
              <h2>Cotización formal</h2>
              <p className="muted">
                Si necesitas un documento para aprobación interna, cuéntanos qué equipos y cantidades y te lo enviamos.
              </p>
            </div>
            <div className="benefit">
              <h2>Factura electrónica</h2>
              <p className="muted">Cada pedido con RUC sale con su factura, y la encuentras junto al estado de tu pedido.</p>
            </div>
          </div>

          <table className="tiers">
            <caption className="sr-only">Descuento por volumen según la cantidad de unidades de un mismo producto</caption>
            <thead>
              <tr>
                <th scope="col">Cantidad por producto</th>
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
        </div>

        <section className="sheet sheet--triplicate" aria-labelledby="b2b-form-title" style={{ marginRight: 14, marginBottom: 14 }}>
          <div className="sheet__holes" aria-hidden="true" />
          <div className="sheet__body">
            {sent ? (
              <div className="stack" style={{ '--stack': '1rem' }} role="status">
                <span className="stamp stamp--ok">Enviado</span>
                <h2 id="b2b-form-title" className="sheet__title">
                  Recibimos tu solicitud
                </h2>
                <p className="muted">Te respondemos al correo que indicaste. Mientras tanto, puedes armar tu pedido.</p>
                <Link to="/catalog" className="btn">
                  Ver catálogo
                </Link>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <h2 id="b2b-form-title" className="sheet__title">
                  Solicita tu cuenta de empresa
                </h2>
                <div className="form__grid">
                  <label className="field">
                    RUC
                    <input
                      className="input"
                      name="ruc"
                      inputMode="numeric"
                      pattern="[0-9]{11}"
                      maxLength={11}
                      required
                      autoComplete="off"
                    />
                    <span className="field__hint">11 dígitos</span>
                  </label>
                  <label className="field">
                    Razón social
                    <input className="input" name="company" required autoComplete="organization" />
                  </label>
                  <label className="field">
                    Nombre de contacto
                    <input className="input" name="contact" required autoComplete="name" />
                  </label>
                  <label className="field">
                    Teléfono
                    <input className="input" type="tel" name="phone" required autoComplete="tel" />
                  </label>
                  <label className="field form__span">
                    Correo electrónico
                    <input className="input" type="email" name="email" required autoComplete="email" />
                  </label>
                  <label className="field form__span">
                    Compra mensual estimada
                    <select className="input" name="volume" defaultValue="">
                      <option value="" disabled>
                        Selecciona un rango
                      </option>
                      <option value="lt-5k">Menos de S/ 5,000</option>
                      <option value="5k-20k">De S/ 5,000 a S/ 20,000</option>
                      <option value="20k-50k">De S/ 20,000 a S/ 50,000</option>
                      <option value="gt-50k">Más de S/ 50,000</option>
                    </select>
                  </label>
                  <label className="field form__span">
                    ¿Qué necesitas comprar?
                    <textarea className="input input--area" name="needs" />
                    <span className="field__hint">Equipos y cantidades, si ya los tienes definidos</span>
                  </label>
                </div>
                <button type="submit" className="btn">
                  Enviar solicitud
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
