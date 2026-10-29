export default function QuantityStepper({ value, onChange, min = 1, max = 999, label = 'Cantidad' }) {
  const clamp = (next) => {
    if (Number.isNaN(next)) return min;
    return Math.max(min, Math.min(max, Math.floor(next)));
  };

  return (
    <div className="stepper" role="group" aria-label={label}>
      <button
        type="button"
        className="stepper__btn"
        aria-label="Quitar una unidad"
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
      >
        −
      </button>
      <input
        className="stepper__input"
        type="number"
        inputMode="numeric"
        aria-label={label}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value)))}
      />
      <button
        type="button"
        className="stepper__btn"
        aria-label="Agregar una unidad"
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
      >
        +
      </button>
    </div>
  );
}
