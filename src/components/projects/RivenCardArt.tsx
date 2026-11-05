const ink = "#1a1a1a";
const inkRaised = "#222220";
const cardFill = "#202020";
const shard = "#2a2a28";
const lavender = "#f0d7ff";
const cream = "#ffffeb";
const fog = "#8a8a80";
const glowEdge = "#7c6a8a";
const display = "var(--font-eb-garamond)";
const body = "var(--font-figtree)";

export default function RivenCardArt() {
  return (
    <svg
      viewBox="0 0 400 260"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A veiled Riven mod card with a glowing crystal sigil"
    >
      <defs>
        <radialGradient id="riven-bg" cx="50%" cy="38%" r="60%">
          <stop offset="0" stopColor={inkRaised} />
          <stop offset="1" stopColor={ink} />
        </radialGradient>
        <radialGradient id="riven-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={cream} />
          <stop offset=".35" stopColor={lavender} stopOpacity=".85" />
          <stop offset="1" stopColor={glowEdge} stopOpacity="0" />
        </radialGradient>
        <clipPath id="riven-window">
          <path d="M147 34 H253 L262 43 V140 H138 V43 Z" />
        </clipPath>
      </defs>

      <rect width="400" height="260" fill="url(#riven-bg)" />
      <g fill={shard}>
        <path d="M40 40 L58 30 L52 58 Z" />
        <path d="M330 30 L352 44 L334 52 Z" />
        <path d="M60 200 L78 214 L50 222 Z" />
        <path d="M340 196 L362 186 L356 214 Z" />
        <path d="M92 120 L100 110 L104 126 Z" />
        <path d="M300 120 L310 128 L298 134 Z" />
      </g>
      <circle cx="200" cy="96" r="120" fill="url(#riven-glow)" opacity=".18" />

      {/* Frame spikes and card body */}
      <g fill={lavender} stroke={ink} strokeWidth="1">
        <path d="M200 4 L208 18 L200 24 L192 18 Z" />
        <path d="M132 22 L142 18 L138 30 Z" />
        <path d="M268 22 L258 18 L262 30 Z" />
        <path d="M120 92 L128 84 L128 102 Z" />
        <path d="M280 92 L272 84 L272 102 Z" />
        <path d="M118 150 L128 144 L128 160 Z" />
        <path d="M282 150 L272 144 L272 160 Z" />
        <path d="M126 238 L138 236 L132 248 Z" />
        <path d="M274 238 L262 236 L268 248 Z" />
      </g>
      <path
        d="M142 20 H258 L276 38 V224 L258 242 H142 L124 224 V38 Z"
        fill={cardFill}
        stroke={lavender}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M147 27 H253 L269 43 V219 L253 235 H147 L131 219 V43 Z" fill="none" stroke={fog} strokeWidth="1.2" />

      {/* Glowing art window with sigil */}
      <g clipPath="url(#riven-window)">
        <rect x="130" y="30" width="140" height="112" fill={ink} />
        <circle cx="200" cy="82" r="78" fill="url(#riven-glow)" />
        <path
          d="M200 82 L140 40 M200 82 L260 40 M200 82 L132 100 M200 82 L268 100 M200 82 L170 140 M200 82 L230 140 M200 82 L200 30"
          stroke={cream}
          strokeWidth="1.2"
          opacity=".55"
        />
        <g stroke={ink} strokeWidth="1.5" strokeLinejoin="round">
          <path d="M176 64 L200 52 L224 64 L208 76 L200 72 L192 76 Z" fill={cream} />
          <path d="M178 72 L194 82 L200 112 L172 84 Z" fill={lavender} />
          <path d="M222 72 L206 82 L200 112 L228 84 Z" fill={cream} />
        </g>
        <path d="M200 118 L204 126 L200 134 L196 126 Z" fill={cream} />
      </g>
      <path d="M138 140 H262" stroke={fog} strokeWidth="1.2" />

      {/* Corner tag */}
      <path d="M234 26 H262 L270 34 V44 H240 L234 38 Z" fill={ink} stroke={lavender} strokeWidth="1.5" />
      <text x="252" y="35.5" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: display }} fontSize="12" fill={cream}>
        ???
      </text>

      {/* Title and stat lines */}
      <text x="200" y="166" textAnchor="middle" style={{ fontFamily: display }} fontSize="20" fill={cream}>
        Riven Mod
      </text>
      <g strokeLinecap="round" strokeWidth="4" stroke={fog}>
        <line x1="160" y1="182" x2="232" y2="182" />
        <line x1="166" y1="194" x2="226" y2="194" />
        <line x1="176" y1="206" x2="214" y2="206" />
      </g>

      {/* Bottom banner */}
      <path d="M140 216 H260 L266 222 L260 230 H140 L134 222 Z" fill={ink} stroke={lavender} strokeWidth="1.5" />
      <text
        x="200"
        y="226.5"
        textAnchor="middle"
        style={{ fontFamily: body }}
        fontSize="9"
        fontWeight="600"
        letterSpacing="2.4"
        fill={cream}
      >
        VEILED
      </text>
    </svg>
  );
}
