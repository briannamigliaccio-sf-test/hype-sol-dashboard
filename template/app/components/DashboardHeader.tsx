// DashboardHeader — page-level title, description, and data freshness
// Usage:
//   <DashboardHeader
//     title="Validator Health"
//     description="Active validator set metrics across mainnet."
//     dataAsOf="2026-05-29T00:00:00Z"  // null = show live clock
//     loading={false}
//   />

'use client';
import { useEffect, useState } from 'react';

type DashboardHeaderProps = {
  title: string;
  description?: string;
  dataAsOf?: string | null; // ISO string or null for live
  loading?: boolean;
};

export function DashboardHeader({
  title,
  description,
  dataAsOf = null,
  loading = false,
}: DashboardHeaderProps) {
  const [now, setNow] = useState(new Date());

  // Live clock — only ticks when dataAsOf is null
  useEffect(() => {
    if (dataAsOf) return;
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, [dataAsOf]);

  const timestamp = dataAsOf ? new Date(dataAsOf) : now;
  const formatted = timestamp.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        {loading ? (
          <>
            <div className="skeleton h-7 w-48 mb-2" />
            <div className="skeleton h-4 w-80" />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-[#6b7280] max-w-xl text-pretty">{description}</p>
            )}
          </>
        )}
      </div>
      <div className="flex-shrink-0">
        <p className="text-xs text-[#6b7280]">
          {dataAsOf ? 'Data as of' : 'Updated'}{' '}
          <span className="text-slate-400 font-medium metric">{formatted}</span>
        </p>
      </div>
    </div>
  );
}
