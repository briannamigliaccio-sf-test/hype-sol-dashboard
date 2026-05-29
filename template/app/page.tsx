'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { DashboardHeader } from './components/DashboardHeader';
import { KpiCard } from './components/KpiCard';
import { ChartCard } from './components/ChartCard';
import { MetricTable } from './components/MetricTable';

// ✅ CUSTOMIZE: Edit these to describe your dashboard
const DASHBOARD_CONFIG = {
  title: '[Dashboard Name]',
  description: '[One sentence: what this dashboard shows and who it’s for]',
  // ISO date string or null to show live clock
  dataAsOf: null as string | null,
};

// ✅ CUSTOMIZE: Define your KPI cards
const PLACEHOLDER_KPIS = [
  { label: 'Metric 1', value: '$0', change: '+0%', positive: true },
  { label: 'Metric 2', value: '0', change: '+0%', positive: true },
  { label: 'Metric 3', value: '0%', change: '-0%', positive: false },
  { label: 'Metric 4', value: '0', change: '+0', positive: true },
];

// ✅ CUSTOMIZE: Replace with your data shape
type DashboardData = {
  kpis: typeof PLACEHOLDER_KPIS;
  timeSeries: { date: string; value: number; value2?: number }[];
  breakdown: { name: string; value: number }[];
  tableRows: { rank: number; name: string; value: string; change: string }[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/data')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const kpis = data?.kpis ?? PLACEHOLDER_KPIS;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <DashboardHeader
        title={DASHBOARD_CONFIG.title}
        description={DASHBOARD_CONFIG.description}
        dataAsOf={DASHBOARD_CONFIG.dataAsOf}
        loading={loading}
      />

      {/* KPI row — 4 cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} loading={loading} />
        ))}
      </div>

      {/* Charts — 2x2 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Chart 1: Area chart (time series) */}
        {/* ✅ CUSTOMIZE: Change chart type, keys, and colors */}
        <ChartCard
          title="[Metric Over Time]"
          subtitle="[Unit or time window]"
          loading={loading}
          error={error}
          empty={data?.timeSeries?.length === 0}
        >
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data?.timeSeries ?? []}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9945FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9945FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#9945FF"
                strokeWidth={2}
                fill="url(#grad1)"
                name="[Metric]"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2: Bar chart (comparison) */}
        {/* ✅ CUSTOMIZE: Add or remove Bar entries */}
        <ChartCard
          title="[Comparison Metric]"
          subtitle="[What's being compared]"
          loading={loading}
          error={error}
          empty={data?.breakdown?.length === 0}
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data?.breakdown ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="value" fill="#14F195" radius={[4, 4, 0, 0]} name="[Metric]" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 3: Line chart (multi-series) */}
        {/* ✅ CUSTOMIZE: Add second Line for comparison */}
        <ChartCard
          title="[Trend Comparison]"
          subtitle="[What's being trended]"
          loading={loading}
          error={error}
          empty={data?.timeSeries?.length === 0}
        >
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data?.timeSeries ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend wrapperStyle={{ color: '#9ca3af', fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#9945FF" strokeWidth={2} dot={false} name="[Series A]" />
              <Line type="monotone" dataKey="value2" stroke="#14F195" strokeWidth={2} dot={false} name="[Series B]" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 4: Ranked table */}
        {/* ✅ CUSTOMIZE: Rename columns to match your data */}
        <ChartCard
          title="[Top N Table]"
          subtitle="[Ranked by what]"
          loading={loading}
          error={error}
          empty={data?.tableRows?.length === 0}
        >
          <MetricTable
            loading={loading}
            columns={['Rank', 'Name', 'Value', 'Change']}
            rows={data?.tableRows?.map((r) => [
              String(r.rank),
              r.name,
              r.value,
              r.change,
            ]) ?? []}
          />
        </ChartCard>

      </div>
    </div>
  );
}
