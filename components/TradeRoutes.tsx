/**
 * Abstract trade-route illustration: a dotted field with curved routes
 * radiating from an Indian sourcing origin to neutral, unlabeled buyer
 * regions. Deliberately no country names, offices or coverage claims.
 */
export function TradeRoutes({ className }: { className?: string }) {
  const routes = [
    "M 470 250 C 380 200, 280 200, 190 230",
    "M 470 250 C 400 160, 330 120, 260 100",
    "M 470 250 C 560 200, 660 190, 770 200",
    "M 470 250 C 580 280, 700 300, 820 290",
    "M 470 250 C 430 330, 360 390, 260 410",
    "M 470 250 C 560 320, 640 380, 720 430",
  ];
  const dots: Array<[number, number]> = [];
  for (let x = 40; x <= 920; x += 36) {
    for (let y = 40; y <= 480; y += 36) dots.push([x, y]);
  }
  return (
    <svg
      viewBox="0 0 960 520"
      role="img"
      aria-label="Illustration of trade routes connecting Indian sourcing with international buyer regions"
      className={className}
    >
      <g fill="currentColor" opacity="0.16">
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.2" />
        ))}
      </g>
      <g fill="none" strokeWidth="1.6" strokeDasharray="7 7" opacity="0.85">
        {routes.map((d, i) => (
          <path key={i} d={d} stroke={i % 2 ? "#C7A568" : "#537A46"} />
        ))}
      </g>
      {/* Origin */}
      <g>
        <circle cx="470" cy="250" r="26" fill="#173D2B" opacity="0.12" />
        <circle cx="470" cy="250" r="12" fill="#173D2B" />
        <circle cx="470" cy="250" r="5" fill="#C7A568" />
      </g>
      {/* Destinations (neutral) */}
      {[
        [190, 230],
        [260, 100],
        [770, 200],
        [820, 290],
        [260, 410],
        [720, 430],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="none" stroke="#C7A568" strokeWidth="1.6" />
          <circle cx={x} cy={y} r="3" fill="#C7A568" />
        </g>
      ))}
      <g fontSize="15" fontWeight="700" letterSpacing="3">
        <text x="470" y="300" textAnchor="middle" fill="#173D2B">
          SOURCING · INDIA
        </text>
      </g>
    </svg>
  );
}
