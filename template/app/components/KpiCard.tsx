// KpiCard — single metric tile with trend indicator
// Usage: <KpiCard label="TVL" value="$1.2B" change="+12.4%" positive={true} loading={false} />

type KpiCardProps = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  loading?: boolean;
};

export function KpiCard({ label, value, change, positive, loading = false }: KpiCardProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-[#374151] bg-[#111827] p-5 space-y-3">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-7 w-32" />
        <div className="skeleton h-3 w-16" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#374151] bg-[#111827] p-5 hover:border-[#9945FF]/40 transition-colors">
      <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white metric">{value}</p>
      <p
        className={`mt-1 text-xs font-medium metric ${
          positive ? 'text-[#14F195]' : 'text-[#FF4444]'
        }`}
      >
        {change}
      </p>
    </div>
  );
}
