import type { Metadata } from 'next';
import './globals.css';

// ✅ CUSTOMIZE: Update these for your dashboard
export const metadata: Metadata = {
  title: 'SF Dashboard — [Your Dashboard Name]',
  description: '[What this dashboard shows]',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-[#0a0a0a] text-slate-100">
        {/* SF Navigation bar */}
        <nav className="border-b border-[#374151] bg-[#111827]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Solana Foundation logo mark */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex-shrink-0" />
              <span className="text-sm font-semibold text-white tracking-tight">
                Solana Foundation
              </span>
              <span className="text-[#6b7280] text-sm">/</span>
              {/* ✅ CUSTOMIZE: Replace with your dashboard name */}
              <span className="text-sm text-slate-300">[Dashboard Name]</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#6b7280]">Internal</span>
              <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" title="Live" />
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
