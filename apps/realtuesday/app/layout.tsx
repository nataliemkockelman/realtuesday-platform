import type { Metadata, Viewport } from 'next';
import { fontVariables } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  // Canonical site URL. Used to absolutize relative OG image paths so
  // social previews resolve correctly when posted off-site.
  metadataBase: new URL('https://arealtuesday.com'),
  title: {
    default: 'real Tuesday — a studio making things worth your Tuesday',
    template: '%s · real Tuesday',
  },
  description:
    'A studio making things worth your Tuesday. Honest brands for people doing real work — and a weekly newsletter, notes from a tuesday.',
  applicationName: 'real Tuesday',
  authors: [{ name: 'Natalie' }],
  creator: 'Real Tuesday',
  publisher: 'Real Tuesday',
  openGraph: {
    type: 'website',
    siteName: 'real Tuesday',
    title: 'real Tuesday',
    description: 'A studio making things worth your Tuesday.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'real Tuesday',
    description: 'A studio making things worth your Tuesday.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#1A2238',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-navy text-cream antialiased">{children}</body>
    </html>
  );
}
