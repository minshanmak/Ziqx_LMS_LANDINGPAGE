import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'ZIQX Skills',
  description: 'Create structured online courses from your existing YouTube Unlisted videos.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
