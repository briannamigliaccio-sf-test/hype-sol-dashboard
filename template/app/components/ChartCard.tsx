// ChartCard — chart wrapper with loading skeleton, error, and empty states
// Usage:
//   <ChartCard title="TVL Over Time" subtitle="USD" loading={false} error={null} empty={false}>
//     <YourRechartsChart />
//   </ChartCard>

type ChartCardProps = {
  title: string;
  subtitle?: string;
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  children: React.ReactNode;
};

export function ChartCard({
  title,
  subtitle,
  loading = false,
  error = null,
  empty = false,
  children,
}: ChartCardProps) {
  return (
    <div className="rounded-xl border border-[#374151] bg-[#111827] p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-[#6b7280] mt-0.5">{subtitle}</p>}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-2">
          <div className="skeleton h-48 w-full rounded-lg" />
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="h-48 flex items-center justify-center rounded-lg border border-[#FF4444]/20 bg-[#FF4444]/5">
          <div className="text-center">
            <p className="text-sm text-[#FF4444]">Failed to load data</p>
            <p className="text-xs text-[#6b7280] mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Empty state — always has one clear next action */}
      {!loading && !error && empty && (
        <div className="h-48 flex items-center justify-center rounded-lg border border-dashed border-[#374151]">
          <div className="text-center">
            <p className="text-sm text-[#6b7280]">No data available</p>
            <p className="text-xs text-[#6b7280] mt-1">
              {/* ✅ CUSTOMIZE: Replace with a useful action for your dashboard */}
              Check your data source connection in{' '}
              <code className="text-[#9945FF]">app/api/data/route.ts</code>
            </p>
          </div>
        </div>
      )}

      {/* Chart content */}
      {!loading && !error && !empty && children}
    </div>
  );
}
