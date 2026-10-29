// Datos de muestra del catálogo. Sustituir por la respuesta de GET /products
// (ver services/productService.js) cuando el backend esté conectado.

export const IGV_RATE = 0.18;

// Descuento por volumen según la cantidad de un mismo producto.
export const VOLUME_TIERS = [
  { min: 1, max: 4, discount: 0, label: '1 a 4 unidades' },
  { min: 5, max: 9, discount: 0.05, label: '5 a 9 unidades' },
  { min: 10, max: 24, discount: 0.08, label: '10 a 24 unidades' },
  { min: 25, max: Infinity, discount: 0.12, label: '25 o más unidades' },
];

export const CATEGORIES = [
  { id: 'computo', label: 'Cómputo' },
  { id: 'impresion', label: 'Impresión' },
  { id: 'punto-de-venta', label: 'Punto de venta' },
  { id: 'redes', label: 'Redes' },
  { id: 'herramientas', label: 'Herramientas' },
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    sku: 'LP-014',
    name: 'Laptop Pro 14',
    category: 'computo',
    glyph: 'laptop',
    price: 1800,
    stock: 24,
    description: 'Laptop de alto rendimiento para equipos de oficina y ventas.',
    specs: [
      ['Pantalla', '14 pulgadas'],
      ['Uso recomendado', 'Oficina y ventas'],
      ['Garantía', 'Consultar con tu asesor'],
    ],
  },
  {
    id: 'prod-2',
    sku: 'IT-080',
    name: 'Impresora térmica',
    category: 'impresion',
    glyph: 'printer',
    price: 640,
    stock: 15,
    description: 'Perfecta para tickets y documentos de punto de venta.',
    specs: [
      ['Tipo', 'Térmica directa'],
      ['Uso recomendado', 'Tickets y comprobantes'],
      ['Garantía', 'Consultar con tu asesor'],
    ],
  },
  {
    id: 'prod-3',
    sku: 'KH-120',
    name: 'Kit de herramientas',
    category: 'herramientas',
    glyph: 'toolbox',
    price: 290,
    stock: 42,
    description: 'Conjunto completo para mantenimiento y obra.',
    specs: [
      ['Contenido', 'Conjunto completo'],
      ['Uso recomendado', 'Mantenimiento y obra'],
      ['Garantía', 'Consultar con tu asesor'],
    ],
  },
  {
    id: 'prod-4',
    sku: 'MN-240',
    name: 'Monitor 24" Full HD',
    category: 'computo',
    glyph: 'monitor',
    price: 520,
    stock: 31,
    description: 'Monitor de 24 pulgadas para puestos de trabajo y atención al cliente.',
    specs: [
      ['Pantalla', '24 pulgadas'],
      ['Resolución', 'Full HD'],
      ['Garantía', 'Consultar con tu asesor'],
    ],
  },
  {
    id: 'prod-5',
    sku: 'LB-210',
    name: 'Lector de códigos de barras',
    category: 'punto-de-venta',
    glyph: 'scanner',
    price: 185,
    stock: 60,
    description: 'Lectura rápida en caja y en almacén, lista para conectar a tu punto de venta.',
    specs: [
      ['Tipo', 'Lector de mano'],
      ['Uso recomendado', 'Caja y almacén'],
      ['Garantía', 'Consultar con tu asesor'],
    ],
  },
  {
    id: 'prod-6',
    sku: 'RW-600',
    name: 'Router Wi-Fi 6 empresarial',
    category: 'redes',
    glyph: 'router',
    price: 410,
    stock: 18,
    description: 'Cobertura estable para oficinas y locales con varios dispositivos conectados.',
    specs: [
      ['Estándar', 'Wi-Fi 6'],
      ['Uso recomendado', 'Oficinas y locales'],
      ['Garantía', 'Consultar con tu asesor'],
    ],
  },
  {
    id: 'prod-7',
    sku: 'GD-410',
    name: 'Gaveta de dinero',
    category: 'punto-de-venta',
    glyph: 'drawer',
    price: 230,
    stock: 12,
    description: 'Gaveta metálica que se abre desde tu impresora de tickets.',
    specs: [
      ['Material', 'Metal'],
      ['Uso recomendado', 'Caja de punto de venta'],
      ['Garantía', 'Consultar con tu asesor'],
    ],
  },
  {
    id: 'prod-8',
    sku: 'IM-330',
    name: 'Impresora multifuncional láser',
    category: 'impresion',
    glyph: 'mfp',
    price: 980,
    stock: 9,
    description: 'Imprime, copia y escanea documentos para oficinas con volumen medio.',
    specs: [
      ['Tecnología', 'Láser'],
      ['Funciones', 'Imprime, copia y escanea'],
      ['Garantía', 'Consultar con tu asesor'],
    ],
  },
];

export const LOW_STOCK_LIMIT = 15;

export function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

export function tierFor(quantity) {
  return VOLUME_TIERS.find((tier) => quantity >= tier.min && quantity <= tier.max) ?? VOLUME_TIERS[0];
}

export function nextTierFor(quantity) {
  return VOLUME_TIERS.find((tier) => tier.min > quantity) ?? null;
}

export function round2(value) {
  return Math.round(value * 100) / 100;
}

export function unitPriceFor(product, quantity) {
  return round2(product.price * (1 - tierFor(quantity).discount));
}

const money = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  currencyDisplay: 'narrowSymbol',
});

export function formatPEN(value) {
  return money.format(value).replace(/ /g, ' ');
}

export function formatPercent(value) {
  return `${Math.round(value * 100)} %`;
}
