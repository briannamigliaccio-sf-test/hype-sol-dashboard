# Solana Foundation Dashboard Template

A ready-to-use Next.js dashboard template for anyone at Solana Foundation who wants to quickly spin up an internal analytics or ecosystem dashboard.

## What's included

- **/template** — copy this folder to start a new dashboard
  - `package.json` — dependencies (Next.js, Tailwind, Recharts, @solana/kit)
  - `tailwind.config.js` — SF design tokens (purple, green, dark background)
  - `app/layout.tsx` — root layout with SF nav header
  - `app/globals.css` — base styles
  - `app/page.tsx` — main dashboard page (4 chart slots, KPI cards, loading/error/empty states)
  - `app/components/` — reusable primitives
    - `KpiCard.tsx` — single metric card with trend indicator
    - `ChartCard.tsx` — chart wrapper with title, subtitle, empty/loading/error states
    - `DashboardHeader.tsx` — page header with title, description, last-updated
    - `MetricTable.tsx` — ranked table for protocol/validator/token lists
  - `app/api/data/route.ts` — API route stub for your data source
  - `app/lib/` — shared utilities
    - `format.ts` — number, currency, percentage, lamport formatters
    - `solana.ts` — @solana/kit RPC helpers (balance, token supply, epoch info)
    - `colors.ts` — chart color palette matching SF brand

## Quick start

```bash
# 1. Copy the template
cp -r template my-dashboard
cd my-dashboard

# 2. Install
pnpm install

# 3. Start
pnpm dev
```

Open http://localhost:3000 — you'll see the template dashboard with placeholder data.

## How to customize

1. Edit `DASHBOARD_CONFIG` at the top of `app/page.tsx` — set the title, description, and data source
2. Replace the placeholder data in `app/api/data/route.ts` with your actual data
3. Swap chart types in `app/page.tsx` — Recharts ships `BarChart`, `LineChart`, `AreaChart`, `PieChart`
4. Add/remove KPI cards by editing the `KPI_CARDS` array
5. Use `app/lib/solana.ts` if your data comes from on-chain RPC calls

## Data source options

| Source | When to use |
|---|---|
| Hardcoded / baked-in | Presentations, one-pagers, snapshots |
| API route (`app/api/data/route.ts`) | Your data lives in a database or Databricks |
| @solana/kit RPC | Live on-chain data (balances, epochs, token supply) |
| DeFiLlama public API | TVL, DEX volume, protocol comparisons |

## Design system

This template follows the SF design conventions from `sf-design-skill`:
- Dark background (`#0a0a0a`) with slate card surfaces
- Purple accent (`#9945FF`) for primary metrics
- Green (`#14F195`) for positive trends
- Red (`#FF4444`) for negative trends
- `tabular-nums` on all metric values
- Skeleton loaders — no spinners
- Empty states have one clear CTA

## Solana-specific utilities

The `app/lib/solana.ts` file gives you:
- `getEpochInfo()` — current epoch, slot, progress %
- `getTokenSupply(mint)` — circulating supply of any SPL token
- `getLamportBalance(address)` — SOL balance formatted from lamports
- `formatLamports(lamports)` — converts lamports → SOL string

All built on `@solana/kit` — no legacy `@solana/web3.js` dependency.
