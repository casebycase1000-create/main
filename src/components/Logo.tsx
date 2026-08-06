export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-accent-600/90 text-white shadow-lg shadow-accent-600/20 ring-1 ring-accent-400/30 overflow-hidden">
        <svg viewBox="0 0 100 100" className="h-8 w-8" fill="none" aria-hidden="true">
          {/*
            Speedometer arc: 7 equal segments arranged in a semicircle (top half).
            Arc center: (50, 62). Arc radius inner=28, outer=40.
            Spans from 195° to 345° with 6° gaps between 7 segments.
            Each segment spans ~18°.
          */}
          {[195, 220, 245, 270, 295, 320, 345].map((startDeg) => {
            const span = 18;
            const ri = 27;
            const ro = 39;
            const cx = 50;
            const cy = 62;
            const toRad = (d: number) => (d * Math.PI) / 180;
            const s = toRad(startDeg);
            const e = toRad(startDeg + span);
            const x1 = (cx + ri * Math.cos(s)).toFixed(3);
            const y1 = (cy + ri * Math.sin(s)).toFixed(3);
            const x2 = (cx + ro * Math.cos(s)).toFixed(3);
            const y2 = (cy + ro * Math.sin(s)).toFixed(3);
            const x3 = (cx + ro * Math.cos(e)).toFixed(3);
            const y3 = (cy + ro * Math.sin(e)).toFixed(3);
            const x4 = (cx + ri * Math.cos(e)).toFixed(3);
            const y4 = (cy + ri * Math.sin(e)).toFixed(3);
            return (
              <path
                key={startDeg}
                d={`M${x1},${y1} L${x2},${y2} A${ro},${ro} 0 0,1 ${x3},${y3} L${x4},${y4} A${ri},${ri} 0 0,0 ${x1},${y1}Z`}
                fill="white"
              />
            );
          })}

          {/*
            Needle: thin triangle from near bottom-center pointing upper-right.
            Base center around (46, 62), tip at (65, 28). Wide base ~4px.
          */}
          <polygon points="44,62 50,60 68,27" fill="white" />

          {/*
            Anvil body: wide flat rectangle with slight taper on bottom sides.
            Matches the logo: wide top surface, slightly narrower bottom of body, horn on left.
          */}
          {/* Main anvil body */}
          <path d="M30,64 L90,64 L88,76 L32,76 Z" fill="white" />
          {/* Horn/beak extending left */}
          <path d="M30,64 L10,68 L30,72 Z" fill="white" />
          {/* Base pedestal */}
          <path d="M40,76 L60,76 L66,88 L34,88 Z" fill="white" />
        </svg>
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ animation: 'sweep 3s ease-in-out infinite' }}
        />
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">
        <span className="text-white">Dash</span>
        <span className="text-accent-400">Forge</span>
      </span>
    </span>
  );
}
