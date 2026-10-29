export default function AuthPage() {
  return (
    <section className="card">
      <h2>Iniciar sesión</h2>
      <form>
        <label>Email <input type="email" /></label>
        <label>Contraseña <input type="password" /></label>
        <button className="button primary" type="submit">Entrar</button>
      </form>
    </section>
  );
}
