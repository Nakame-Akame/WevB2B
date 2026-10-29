import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrderSummary from '../../components/OrderSummary.jsx';
import PageHead from '../../components/PageHead.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState('factura');
  const isInvoice = voucher === 'factura';

  if (cart.lines.length === 0) {
    return (
      <>
        <PageHead title="Pago" />
        <div className="empty">
          <h2>Aún no hay nada que pagar</h2>
          <p className="muted">Agrega productos a tu pedido para continuar.</p>
          <Link to="/catalog" className="btn">
            Ver catálogo
          </Link>
        </div>
      </>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: crear el pedido con POST /orders y redirigir según la respuesta de /payments.
    navigate('/payment-result?status=ok');
  }

  return (
    <>
      <PageHead title="Pago">Elige tu comprobante e indica a dónde enviamos el pedido.</PageHead>

      <div className="split split--wide-left">
        <form className="form" onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <legend className="fieldset__title">Comprobante</legend>
            <div className="choice-row">
              <label className="choice">
                <input
                  className="choice__input"
                  type="radio"
                  name="document"
                  value="factura"
                  checked={isInvoice}
                  onChange={() => setVoucher('factura')}
                />
                <span className="choice__box">
                  <span className="choice__title">Factura</span>
                  <span className="field__hint">Con RUC, para tu empresa</span>
                </span>
              </label>
              <label className="choice">
                <input
                  className="choice__input"
                  type="radio"
                  name="document"
                  value="boleta"
                  checked={!isInvoice}
                  onChange={() => setVoucher('boleta')}
                />
                <span className="choice__box">
                  <span className="choice__title">Boleta</span>
                  <span className="field__hint">Con DNI, para compras personales</span>
                </span>
              </label>
            </div>

            <div className="form__grid">
              {isInvoice ? (
                <>
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
                </>
              ) : (
                <>
                  <label className="field">
                    DNI
                    <input
                      className="input"
                      name="dni"
                      inputMode="numeric"
                      pattern="[0-9]{8}"
                      maxLength={8}
                      required
                      autoComplete="off"
                    />
                    <span className="field__hint">8 dígitos</span>
                  </label>
                  <label className="field">
                    Nombre completo
                    <input className="input" name="fullname" required autoComplete="name" />
                  </label>
                </>
              )}
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset__title">Contacto</legend>
            <div className="form__grid">
              <label className="field">
                Correo electrónico
                <input className="input" type="email" name="email" required autoComplete="email" />
                <span className="field__hint">Aquí enviamos tu comprobante</span>
              </label>
              <label className="field">
                Teléfono
                <input className="input" type="tel" name="phone" required autoComplete="tel" />
              </label>
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset__title">Entrega</legend>
            <div className="form__grid">
              <label className="field form__span">
                Dirección
                <input className="input" name="address" required autoComplete="street-address" />
              </label>
              <label className="field">
                Distrito
                <input className="input" name="district" required autoComplete="address-level2" />
              </label>
              <label className="field">
                Ciudad
                <input className="input" name="city" required autoComplete="address-level1" />
              </label>
            </div>
          </fieldset>

          <button type="submit" className="btn">
            Pagar {isInvoice ? 'con factura' : 'con boleta'}
          </button>
        </form>

        <OrderSummary cart={cart}>
          <Link to="/cart" className="link">
            Editar mi pedido
          </Link>
        </OrderSummary>
      </div>
    </>
  );
}
