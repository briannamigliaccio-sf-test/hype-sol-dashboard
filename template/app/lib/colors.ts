// colors.ts — Chart color palette matching SF brand
// Import these into your Recharts components for consistent colors across dashboards.

export const SF_COLORS = {
  purple: '#9945FF',
  green: '#14F195',
  cyan: '#00C2FF',
  red: '#FF4444',
  yellow: '#FFB800',
  slate: '#94a3b8',
  muted: '#6b7280',
};

// Ordered palette for multi-series charts (up to 6 series)
export const CHART_PALETTE = [
  '#9945FF', // purple   — primary
  '#14F195', // green    — secondary
  '#00C2FF', // cyan     — tertiary
  '#FFB800', // yellow   — quaternary
  '#FF4444', // red      — quinary (usually negative, use with care)
  '#94a3b8', // slate    — neutral / fallback
];

// Semantic colors — use these for meaning, not just aesthetics
export const SEMANTIC_COLORS = {
  positive: '#14F195',  // up, gain, healthy
  negative: '#FF4444',  // down, loss, alert
  neutral: '#6b7280',   // flat, unknown
  primary: '#9945FF',   // brand / main metric
  warning: '#FFB800',   // caution, approaching limit
};

// Gradient definitions for AreaChart fills (use with <defs> in SVG)
// Example usage in Recharts:
//   <defs><linearGradient id="grad-purple" ...>{AREA_GRADIENTS.purple}</linearGradient></defs>
//   <Area fill="url(#grad-purple)" />
export const AREA_GRADIENTS = {
  purple: [
    { offset: '5%', color: '#9945FF', opacity: 0.3 },
    { offset: '95%', color: '#9945FF', opacity: 0 },
  ],
  green: [
    { offset: '5%', color: '#14F195', opacity: 0.3 },
    { offset: '95%', color: '#14F195', opacity: 0 },
  ],
};
