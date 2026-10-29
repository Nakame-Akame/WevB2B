import { useMemo, useState } from 'react';
import PageHead from '../../components/PageHead.jsx';
import ProductRow from '../../components/ProductRow.jsx';
import { CATEGORIES, PRODUCTS } from '../../data/products.js';

function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export default function CatalogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('todos');

  const visible = useMemo(() => {
    const needle = normalize(query.trim());
    return PRODUCTS.filter((product) => {
      const inCategory = category === 'todos' || product.category === category;
      const matches = needle === '' || normalize(`${product.name} ${product.sku}`).includes(needle);
      return inCategory && matches;
    });
  }, [query, category]);

  function clearFilters() {
    setQuery('');
    setCategory('todos');
  }

  return (
    <>
      <PageHead title="Catálogo">
        Precios unitarios sin IGV. Si compras varias unidades del mismo producto, el precio baja.
      </PageHead>

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

        <div className="chips" role="group" aria-label="Filtrar por categoría">
          <button type="button" className="chip" aria-pressed={category === 'todos'} onClick={() => setCategory('todos')}>
            Todos
          </button>
          {CATEGORIES.map((item) => (
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
  );
}
