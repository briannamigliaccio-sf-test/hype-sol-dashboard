// MetricTable — ranked list for protocols, validators, tokens, etc.
// Usage:
//   <MetricTable
//     columns={['Rank', 'Protocol', 'TVL', '24h Change']}
//     rows={[['1', 'Marinade', '$2.1B', '+3.2%'], ...]}
//     loading={false}
//   />

type MetricTableProps = {
  columns: string[];
  rows: string[][];
  loading?: boolean;
};

export function MetricTable({ columns, rows, loading = false }: MetricTableProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-full rounded" />
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <p className="text-sm text-[#6b7280] text-center py-8">No rows to display.</p>
    );
  }

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#374151]">
            {columns.map((col) => (
              <th
                key={col}
                className="pb-2 px-1 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1f2937]">
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-[#1f2937]/50 transition-colors">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-2.5 px-1 metric ${
                    ci === 0
                      ? 'text-[#6b7280] w-8'
                      : ci === row.length - 1
                      ? cell.startsWith('-')
                        ? 'text-[#FF4444]'
                        : 'text-[#14F195]'
                      : 'text-slate-200'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
