import { useMemo, useState } from 'react';
import LoadError from '../../components/LoadError.jsx';
import PageHead from '../../components/PageHead.jsx';
import ProductRow, { ProductRowGhost } from '../../components/ProductRow.jsx';
import { useProducts } from '../../context/ProductsContext.jsx';

function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export default function CatalogPage() {
  const { products, categories, status, reload } = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('todos');

  const visible = useMemo(() => {
    const needle = normalize(query.trim());
    return products.filter((product) => {
      const inCategory = category === 'todos' || product.categoryId === category;
      const matches = needle === '' || normalize(`${product.name} ${product.sku ?? ''}`).includes(needle);
      return inCategory && matches;
    });
  }, [products, query, category]);

  function clearFilters() {
    setQuery('');
    setCategory('todos');
  }

  return (
    <>
      <PageHead title="Catálogo">
        Precios unitarios sin IGV. Si compras varias unidades del mismo producto, el precio baja.
      </PageHead>

      {status === 'error' ? <LoadError onRetry={reload} /> : null}

      {status === 'loading' ? (
        <>
          <p className="muted small" role="status" style={{ marginBottom: '0.75rem' }}>
            Cargando productos…
          </p>
          <ul className="rows" aria-busy="true">
            {[0, 1, 2, 3].map((slot) => (
              <ProductRowGhost key={slot} />
            ))}
          </ul>
        </>
      ) : null}

      {status === 'ready' && products.length === 0 ? (
        <div className="empty">
          <h2>Todavía no hay productos en el catálogo</h2>
          <p className="muted">Vuelve en un rato: apenas se carguen los verás aquí.</p>
        </div>
      ) : null}

      {status === 'ready' && products.length > 0 ? (
        <>
          <div className="toolbar">
            <label className="field">
              <span className="sr-only">Buscar por nombre o código</span>
              <input
                className="input"
                type="search"
                placeholder="Buscar por nombre o código"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            {categories.length > 1 ? (
              <div className="chips" role="group" aria-label="Filtrar por categoría">
                <button type="button" className="chip" aria-pressed={category === 'todos'} onClick={() => setCategory('todos')}>
                  Todos
                </button>
                {categories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="chip"
                    aria-pressed={category === item.id}
                    onClick={() => setCategory(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <p className="muted small" role="status" style={{ marginBottom: '0.75rem' }}>
            {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
          </p>

          {visible.length > 0 ? (
            <>
              <div className="rows__head" aria-hidden="true">
                <span>Producto</span>
                <span>Stock</span>
                <span>Precio unitario</span>
                <span>Cantidad</span>
              </div>
              <ul className="rows">
                {visible.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </ul>
            </>
          ) : (
            <div className="empty">
              <h2>No encontramos productos con esos filtros</h2>
              <p className="muted">Prueba con otra palabra o quita la categoría seleccionada.</p>
              <button type="button" className="btn btn--ghost" onClick={clearFilters}>
                Quitar filtros
              </button>
            </div>
          )}
        </>
      ) : null}
    </>
  );
}
