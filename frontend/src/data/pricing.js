// Reglas de precio y formato. Los productos vienen de la API (ver services/productService.js).
// Los tramos de descuento son un criterio de la tienda: el backend aún no expone precios por volumen.

export const IGV_RATE = 0.18;

// Descuento por volumen según la cantidad de un mismo producto.
export const VOLUME_TIERS = [
  { min: 1, max: 4, discount: 0, label: '1 a 4 unidades' },
  { min: 5, max: 9, discount: 0.05, label: '5 a 9 unidades' },
  { min: 10, max: 24, discount: 0.08, label: '10 a 24 unidades' },
  { min: 25, max: Infinity, discount: 0.12, label: '25 o más unidades' },
];

export const LOW_STOCK_LIMIT = 15;

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
