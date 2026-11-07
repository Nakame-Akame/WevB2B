const GLYPHS = {
  laptop: (
    <>
      <rect x="12" y="14" width="40" height="26" rx="2" />
      <path d="M6 46h52l-3 6H9z" />
    </>
  ),
  printer: (
    <>
      <rect x="12" y="26" width="40" height="20" rx="3" />
      <path d="M20 26V12h24v14" />
      <path d="M20 38h24v14H20z" />
      <path d="M25 44h14M25 48h9" />
    </>
  ),
  toolbox: (
    <>
      <rect x="8" y="24" width="48" height="28" rx="3" />
      <path d="M24 24v-6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6" />
      <path d="M8 36h48M28 33v6h8v-6" />
    </>
  ),
  monitor: (
    <>
      <rect x="8" y="12" width="48" height="30" rx="2" />
      <path d="M24 54h16M32 42v12" />
    </>
  ),
  scanner: (
    <>
      <path d="M12 16v32M18 16v32M24 16v32M32 16v32M38 16v32M46 16v32M52 16v32" />
      <path d="M6 32h52" />
    </>
  ),
  router: (
    <>
      <rect x="8" y="34" width="48" height="14" rx="3" />
      <path d="M16 41h.01M24 41h.01M20 34l-6-14M44 34l6-14M32 34V16" />
    </>
  ),
  drawer: (
    <>
      <rect x="8" y="30" width="48" height="20" rx="2" />
      <path d="M8 38h48M26 44h12" />
      <path d="M14 30l4-12h28l4 12" />
    </>
  ),
  mfp: (
    <>
      <rect x="8" y="28" width="48" height="22" rx="3" />
      <path d="M16 28v-8h32v8" />
      <path d="M20 38h24v12H20z" />
      <path d="M48 34h.01" />
    </>
  ),
  chair: (
    <>
      <rect x="14" y="8" width="9" height="24" rx="3" />
      <rect x="14" y="32" width="34" height="8" rx="3" />
      <path d="M23 24h14v8" />
      <path d="M31 40v10M19 56h24M31 50l-12 6M31 50l12 6" />
    </>
  ),
  box: (
    <>
      <path d="M8 20l24-10 24 10v24L32 54 8 44z" />
      <path d="M8 20l24 10 24-10M32 30v24" />
    </>
  ),
};

export default function ProductThumb({ glyph, large = false }) {
  return (
    <div className={large ? 'thumb thumb--large' : 'thumb'} aria-hidden="true">
      <svg
        className="thumb__glyph"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {GLYPHS[glyph] ?? GLYPHS.box}
      </svg>
    </div>
  );
}
