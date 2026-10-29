export default function PageHead({ title, children }) {
  return (
    <header className="page-head">
      <h1 className="page-head__title">{title}</h1>
      {children ? <p className="lede">{children}</p> : null}
    </header>
  );
}
