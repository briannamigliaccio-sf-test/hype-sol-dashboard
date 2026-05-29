// format.ts — Number, currency, and Solana-specific formatters
// All formatters use tabular-nums-friendly output (no ambiguous characters).

/**
 * Format a USD dollar amount
 * formatUsd(1_234_567.89) => "$1.23M"
 */
export function formatUsd(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

/**
 * Format a large integer with compact suffix
 * formatCompact(4_500_000) => "4.5M"
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
}

/**
 * Format a percentage change with sign
 * formatPct(0.1234) => "+12.34%"
 * formatPct(-0.05) => "-5.00%"
 */
export function formatPct(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${(value * 100).toFixed(2)}%`;
}

/**
 * Convert lamports to SOL string
 * formatLamports(1_000_000_000n) => "1.000 SOL"
 */
export function formatLamports(lamports: bigint | number): string {
  const sol = Number(lamports) / 1_000_000_000;
  return `${sol.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} SOL`;
}

/**
 * Shorten a base58 address for display
 * shortenAddress('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM') => '9WzD...AWWM'
 */
export function shortenAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Format a Unix timestamp as a short date
 * formatDate(1717027200) => 'May 29, 2026'
 */
export function formatDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
