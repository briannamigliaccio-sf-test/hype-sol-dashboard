import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HYPE/SOL Perps Dashboard',
  description: 'Hyperliquid vs Solana perpetual futures volume comparison',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
