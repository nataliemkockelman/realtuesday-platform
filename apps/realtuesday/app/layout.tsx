import type { Metadata, Viewport } from 'next';
import { fontVariables } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  // Canonical site URL. Used to absolutize relative OG image paths so
  // social previews resolve correctly when posted off-site.
  metadataBase: new URL('https://arealtuesday.com'),
  title: {
    default: 'real Tuesday · operations studio',
    template: '%s · real Tuesday',
  },
  description:
    'An operations studio run by two operators. We find the work your business hates, build the systems that run it, and stay until your team actually adopts them.',
  applicationName: 'real Tuesday',
  creator: 'Real Tuesday',
  publisher: 'Real Tuesday',
  openGraph: {
    type: 'website',
    siteName: 'real Tuesday',
    title: 'real Tuesday · operations studio',
    description:
      'Two operators who find the work your business hates, build the systems that run it, and stay until your team adopts them.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'real Tuesday · operations studio',
    description:
      'Two operators who find the work your business hates, build the systems that run it, and stay until your team adopts them.',
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
