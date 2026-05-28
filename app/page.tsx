'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const fmt = (v: number) =>
  v >= 1e9 ? `$${(v / 1e9).toFixed(1)}B` : v >= 1e6 ? `$${(v / 1e6).toFixed(0)}M` : `$${v.toLocaleString()}`;

const shortDate = (d: string) => {
  const [, m, day] = d.split('-');
  return `${m}/${day}`;
};

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard-data')
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading data…</p>
      </main>
    );
  }

  const { hype_static, sol_7d, hype_7d, combined_daily, weekly } = data;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          HYPE / SOL Perps Comparison
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Hyperliquid vs Jupiter Perps (Solana) — perpetual futures volume
        </p>
        <p className="text-gray-600 text-xs mt-1">
          Solana: live via Databricks · Hyperliquid: DefiLlama snapshot baked{' '}
          {hype_static.snapshot_date}
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Kpi label="Hype 30d Volume" value={fmt(hype_static.volume_30d_usd)} sub="Hyperliquid" color="text-purple-400" />
        <Kpi label="Sol 7d Volume" value={fmt(sol_7d.volume_usd)} sub="Jupiter Perps" color="text-green-400" />
        <Kpi label="Hype 7d Volume" value={fmt(hype_7d.volume_usd)} sub="Hyperliquid" color="text-purple-400" />
        <Kpi label="Hype Market Share" value={`${hype_static.market_share_30d_pct}%`} sub="of all perp DEX volume" color="text-yellow-400" />
      </div>

      {/* Chart 1: Daily volume bar */}
      <Section title="Daily Perps Volume — Hyperliquid vs Solana">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={combined_daily}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="day" tickFormatter={shortDate} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis tickFormatter={(v) => `$${(v / 1e9).toFixed(1)}B`} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <Tooltip formatter={(v: number) => fmt(v)} labelFormatter={(l) => `Date: ${l}`} contentStyle={{ background: '#111827', border: '1px solid #374151' }} />
            <Legend />
            <Bar dataKey="hype_vol_usd" name="Hyperliquid" fill="#a78bfa" radius={[3, 3, 0, 0]} />
            <Bar dataKey="sol_vol_usd" name="Solana (Jupiter)" fill="#34d399" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      {/* Chart 2: Weekly trend */}
      <Section title="Weekly Volume Trend">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weekly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis tickFormatter={(v) => `$${(v / 1e9).toFixed(1)}B`} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#111827', border: '1px solid #374151' }} />
            <Legend />
            <Line type="monotone" dataKey="hype_vol_usd" name="Hyperliquid" stroke="#a78bfa" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="sol_vol_usd" name="Solana (Jupiter)" stroke="#34d399" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Section>

      {/* Chart 3: Market share area */}
      <Section title="Market Share Over Time (Hyperliquid vs Solana)">
        <p className="text-gray-500 text-xs mb-3">
          Share of combined Hyperliquid + Solana perps volume only
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={combined_daily}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="day" tickFormatter={shortDate} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 100]} />
            <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ background: '#111827', border: '1px solid #374151' }} />
            <Legend />
            <Area type="monotone" dataKey="hype_share_pct" name="Hyperliquid %" stackId="1" stroke="#a78bfa" fill="#7c3aed" fillOpacity={0.6} />
            <Area type="monotone" dataKey="sol_share_pct" name="Solana %" stackId="1" stroke="#34d399" fill="#059669" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </Section>

      {/* Chart 4: 7-day totals table */}
      <Section title="Latest 7-Day Totals">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left py-2 pr-6">Protocol</th>
                <th className="text-right py-2 pr-6">7d Volume</th>
                <th className="text-right py-2 pr-6">vs HYPE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 pr-6 text-purple-400 font-medium">Hyperliquid</td>
                <td className="py-3 pr-6 text-right font-mono">{fmt(hype_7d.volume_usd)}</td>
                <td className="py-3 pr-6 text-right text-gray-400">—</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 pr-6 text-green-400 font-medium">Solana (Jupiter)</td>
                <td className="py-3 pr-6 text-right font-mono">{fmt(sol_7d.volume_usd)}</td>
                <td className="py-3 pr-6 text-right text-gray-400">
                  {((sol_7d.volume_usd / hype_7d.volume_usd) * 100).toFixed(1)}% of Hype
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-6 text-gray-400">Solana Active Traders (7d)</td>
                <td className="py-3 pr-6 text-right font-mono">{sol_7d.traders.toLocaleString()}</td>
                <td className="py-3 pr-6 text-right text-gray-600">—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-xs mt-4">
          Hyperliquid 7d figure from DefiLlama (baked {hype_static.snapshot_date}). Solana figure from Databricks prod.topledger.jupiter_perps.
        </p>
      </Section>
    </main>
  );
}

function Kpi({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-gray-600 text-xs mt-1">{sub}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
      <h2 className="text-base font-semibold text-gray-200 mb-5">{title}</h2>
      {children}
    </div>
  );
}
