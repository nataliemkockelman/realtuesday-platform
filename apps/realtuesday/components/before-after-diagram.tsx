/**
 * BeforeAfterDiagram — the IMG-02 slot on the home page ("you already know
 * where it hurts"). Speced in the copy doc as a custom before/after diagram:
 * tangled tool connections on the left, one clean linear flow on the right.
 *
 * Rendered as inline SVG rather than through the IMG-02 photo slot on purpose.
 * next/image blocks SVG unless dangerouslyAllowSVG is enabled, and a diagram
 * should scale crisply and never crop — inline SVG gives both with no config
 * risk. It sits in the same rounded navy frame PhotoPanel uses so it lines up
 * with the real photos elsewhere on the page.
 *
 * Decorative but legible: a <title>/<desc> pair names it for assistive tech,
 * and preserveAspectRatio="meet" letterboxes gracefully inside the slot's
 * mobile 4:5 vs desktop square frame.
 */
export function BeforeAfterDiagram({ className = '' }: { className?: string }) {
  // Left "before" nodes — scattered, to be wired into a tangle.
  const mess = [
    { x: 70, y: 110 },
    { x: 150, y: 90 },
    { x: 110, y: 180 },
    { x: 60, y: 250 },
    { x: 165, y: 260 },
    { x: 110, y: 320 },
  ];
  // Every messy pair connected — the point is that it is over-connected.
  const tangle: Array<[number, number]> = [];
  for (let i = 0; i < mess.length; i++) {
    for (let j = i + 1; j < mess.length; j++) tangle.push([i, j]);
  }
  // Right "after" nodes — one clean vertical spine.
  const clean = [90, 170, 250, 330];
  const cleanX = 380;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-navy ring-1 ring-navy/10 ${className}`}>
      <svg
        viewBox="0 0 460 420"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-labelledby="ba-title ba-desc"
      >
        <title id="ba-title">Before and after</title>
        <desc id="ba-desc">
          On the left, tools tangled together with crossing connections. On the right, one clean
          linear flow.
        </desc>

        {/* Section labels */}
        <text
          x="115"
          y="52"
          textAnchor="middle"
          style={{ fill: '#8A8FA0', font: '600 13px ui-monospace, monospace', letterSpacing: '2px' }}
        >
          BEFORE
        </text>
        <text
          x="380"
          y="52"
          textAnchor="middle"
          style={{ fill: '#C97B3E', font: '600 13px ui-monospace, monospace', letterSpacing: '2px' }}
        >
          AFTER
        </text>

        {/* Tangle — many crossing links between the messy nodes */}
        <g stroke="#4A5268" strokeWidth="1.5" opacity="0.7">
          {tangle.map(([a, b]) => (
            <line
              key={`t-${a}-${b}`}
              x1={mess[a].x}
              y1={mess[a].y}
              x2={mess[b].x}
              y2={mess[b].y}
            />
          ))}
        </g>
        {/* Messy nodes */}
        {mess.map((n, i) => (
          <circle key={`m-${i}`} cx={n.x} cy={n.y} r="10" fill="#2B3350" stroke="#5B6480" strokeWidth="1.5" />
        ))}

        {/* Divider arrow */}
        <g stroke="#C97B3E" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="238" y1="210" x2="286" y2="210" />
          <path d="M276 200 L288 210 L276 220" />
        </g>

        {/* Clean spine — one straight copper line */}
        <line
          x1={cleanX}
          y1={clean[0]}
          x2={cleanX}
          y2={clean[clean.length - 1]}
          stroke="#C97B3E"
          strokeWidth="2.5"
        />
        {/* Clean nodes */}
        {clean.map((y, i) => (
          <circle key={`c-${i}`} cx={cleanX} cy={y} r="11" fill="#F6F1E8" stroke="#C97B3E" strokeWidth="2.5" />
        ))}
      </svg>
    </div>
  );
}
