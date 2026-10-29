import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead.jsx';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const isLogin = mode === 'login';

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: conectar con POST /auth/login y POST /auth/register.
  }

  return (
    <>
      <PageHead title={isLogin ? 'Ingresar' : 'Crear cuenta'}>
        Con tu cuenta ves tus pedidos, tus comprobantes y tus precios por volumen.
      </PageHead>

      <div className="split">
        <div className="stack" style={{ '--stack': '1.5rem' }}>
          <div className="tabs" role="tablist" aria-label="Acceso">
            <button
              type="button"
              role="tab"
              id="tab-login"
              aria-selected={isLogin}
              aria-controls="auth-panel"
              className="tabs__btn"
              onClick={() => setMode('login')}
            >
              Ya tengo cuenta
            </button>
            <button
              type="button"
              role="tab"
              id="tab-register"
              aria-selected={!isLogin}
              aria-controls="auth-panel"
              className="tabs__btn"
              onClick={() => setMode('register')}
            >
              Soy nuevo
            </button>
          </div>

          <form id="auth-panel" role="tabpanel" className="form" onSubmit={handleSubmit}>
            {!isLogin ? (
              <label className="field">
                Nombre o razón social
                <input className="input" name="name" required autoComplete="name" />
              </label>
            ) : null}
            <label className="field">
              Correo electrónico
              <input className="input" type="email" name="email" required autoComplete="email" />
            </label>
            <label className="field">
              Contraseña
              <input
                className="input"
                type="password"
                name="password"
                required
                minLength={isLogin ? undefined : 8}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
              {!isLogin ? <span className="field__hint">Mínimo 8 caracteres</span> : null}
            </label>
            <button type="submit" className="btn">
              {isLogin ? 'Ingresar' : 'Crear cuenta'}
            </button>
          </form>
        </div>

        <div className="benefits">
          <div className="benefit">
            <h2>Tus pedidos en un solo lugar</h2>
            <p className="muted">Estado de cada pedido y comprobantes para descargar.</p>
          </div>
          <div className="benefit">
            <h2>¿Compras para una empresa?</h2>
            <p className="muted">Solicita una cuenta de empresa para tener precios por volumen y evaluar crédito.</p>
            <Link to="/b2b" className="link">
              Ver condiciones para empresas
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
