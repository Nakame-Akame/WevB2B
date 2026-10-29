export default function CheckoutPage() {
  return (
    <section className="card">
      <h2>Checkout</h2>
      <form>
        <label>Nombre <input type="text" defaultValue="Juan Pérez" /></label>
        <label>Email <input type="email" defaultValue="juan@facturapro.pe" /></label>
        <button className="button primary" type="submit">Continuar</button>
      </form>
    </section>
  );
}
