// app/api/data/route.ts — Data API stub
//
// This route is called by the dashboard page on load.
// Replace the placeholder data below with your actual data source.
//
// Data source options:
//   1. Hardcoded / baked-in  — best for presentations and snapshots
//   2. Databricks SQL        — use AGENT_DASHBOARD_API_URL proxy if available
//   3. @solana/kit RPC       — import helpers from app/lib/solana.ts
//   4. External API          — fetch from DeFiLlama, internal services, etc.

import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Use 'edge' if you want Vercel Edge Runtime
export const revalidate = 60;    // Cache for 60s (Next.js ISR). Set to 0 for live.

export async function GET() {
  try {
    // ✅ REPLACE THIS with your actual data fetching logic
    // ----------------------------------------------------------------
    // Example 1: Hardcoded data (for presentations)
    const data = buildPlaceholderData();

    // Example 2: Solana RPC (import from app/lib/solana.ts)
    // import { getEpochInfo } from '@/app/lib/solana';
    // const epoch = await getEpochInfo();

    // Example 3: DeFiLlama public API
    // const res = await fetch('https://api.llama.fi/protocol/marinade');
    // const protocol = await res.json();

    // Example 4: Databricks via proxy (if AGENT_DASHBOARD_API_URL is set)
    // const res = await fetch(`${process.env.AGENT_DASHBOARD_API_URL}/api/dashboard-data/YOUR_KEY/query`, {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${process.env.AGENT_DASHBOARD_TOKEN}` },
    //   body: JSON.stringify({ query_id: 'your_query_id' }),
    // });
    // const dbData = await res.json();
    // ----------------------------------------------------------------

    return NextResponse.json(data);
  } catch (err) {
    console.error('[dashboard/api/data] Error fetching data:', err);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

// ✅ REPLACE: Build or fetch your real data shape here
function buildPlaceholderData() {
  // Generate 30 days of fake time series
  const timeSeries = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(1_000_000 + Math.sin(i / 4) * 200_000 + i * 15_000),
      value2: Math.round(800_000 + Math.cos(i / 4) * 150_000 + i * 10_000),
    };
  });

  return {
    kpis: [
      { label: 'Metric 1', value: '$1.23B', change: '+12.4%', positive: true },
      { label: 'Metric 2', value: '4,521', change: '+3.2%', positive: true },
      { label: 'Metric 3', value: '68.4%', change: '-1.1%', positive: false },
      { label: 'Metric 4', value: '312M', change: '+8.7%', positive: true },
    ],
    timeSeries,
    breakdown: [
      { name: 'Category A', value: 420 },
      { name: 'Category B', value: 310 },
      { name: 'Category C', value: 280 },
      { name: 'Category D', value: 195 },
      { name: 'Category E', value: 140 },
    ],
    tableRows: [
      { rank: 1, name: 'Item Alpha', value: '$2.1B', change: '+5.2%' },
      { rank: 2, name: 'Item Beta', value: '$1.8B', change: '+1.4%' },
      { rank: 3, name: 'Item Gamma', value: '$950M', change: '-0.8%' },
      { rank: 4, name: 'Item Delta', value: '$720M', change: '+3.1%' },
      { rank: 5, name: 'Item Epsilon', value: '$310M', change: '-2.3%' },
    ],
  };
}
