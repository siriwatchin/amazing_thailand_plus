// Thai decorative motifs — kanok corner, lotus, and lai thai divider band.
// Pure SVG, no external assets. Inherits colour via `currentColor` so callers
// just set `text-gold` / `text-lotus` / etc.

interface OrnamentProps {
  className?: string;
  flip?: boolean;
}

// ── Kanok corner flourish (ลายกนก) ───────────────────────────────────────────
// Stylised flame/leaf curl drawn from the corner inward. Mirror via `flip`.
export function KanokCorner({ className = "", flip = false }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        {/* Outer curl — main flame */}
        <path d="M 4 4 C 4 28, 22 36, 38 30 C 50 26, 54 18, 50 8" />
        {/* Inner spiral */}
        <path d="M 10 10 C 12 22, 22 26, 30 22 C 36 19, 38 14, 34 10" opacity="0.85" />
        {/* Tip detail */}
        <path d="M 50 8 C 56 6, 62 10, 60 16" />
        {/* Secondary leaflet rising */}
        <path d="M 4 30 C 12 38, 14 48, 10 58" opacity="0.7" />
        <path d="M 10 58 C 16 60, 22 56, 22 50" opacity="0.7" />
        {/* Decorative dots */}
        <circle cx="42" cy="26" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="14" cy="50" r="1.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

// ── Lotus bloom (ดอกบัว) ──────────────────────────────────────────────────────
// Centred eight-petal lotus with a glowing pistil. Use as section accent or
// as a centre flourish above the FinalCTA / Passport headline.
export function LotusBloom({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <g transform="translate(32 32)" fill="currentColor">
        {petals.map((deg, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-16"
            rx="4.5"
            ry="11"
            transform={`rotate(${deg})`}
            opacity={i % 2 === 0 ? 0.85 : 0.55}
          />
        ))}
        {/* Pistil — gold heart */}
        <circle r="4" fill="currentColor" opacity="1" />
        <circle r="2" fill="#FBF6EE" opacity="0.9" />
      </g>
    </svg>
  );
}

// ── Lai Thai divider band (ลายไทย) ────────────────────────────────────────────
// A repeating wave + flame motif for use between major sections. Renders as
// a wide thin band; colour via `currentColor`. Tile-friendly.
export function LaiThaiDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 24"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        {/* Centre line */}
        <line x1="0" y1="12" x2="480" y2="12" opacity="0.35" />
        {/* Repeating up-flames */}
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 24 + i * 48;
          return (
            <g key={i}>
              <path d={`M ${x - 8} 12 C ${x - 6} 4, ${x + 6} 4, ${x + 8} 12`} />
              <path
                d={`M ${x - 4} 12 C ${x - 3} 8, ${x + 3} 8, ${x + 4} 12`}
                opacity="0.6"
              />
              <circle cx={x} cy="2" r="1.4" fill="currentColor" stroke="none" />
            </g>
          );
        })}
        {/* Repeating down-flames offset */}
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 48 + i * 48;
          return (
            <path
              key={i}
              d={`M ${x - 6} 12 C ${x - 4} 18, ${x + 4} 18, ${x + 6} 12`}
              opacity="0.55"
            />
          );
        })}
      </g>
    </svg>
  );
}

// ── Section divider — ready-to-use band with side dots ───────────────────────
export function ThaiSectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-gold/60 ${className}`}
      aria-hidden="true"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <LaiThaiDivider className="w-32 sm:w-44 h-3" />
      <span className="text-current text-base">❖</span>
      <LaiThaiDivider className="w-32 sm:w-44 h-3" />
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
    </div>
  );
}
