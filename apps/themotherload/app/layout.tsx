import type { Metadata, Viewport } from 'next';
import { fontVariables } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://themotherload.co'),
  title: {
    default: 'the Motherload — for moms running the whole damn show',
    template: '%s · the Motherload',
  },
  description:
    'Real tools for moms running the whole damn show. Workbooks, cheat sheets, and templates — every one tested by an actual mom before it ships.',
  applicationName: 'the Motherload',
  authors: [{ name: 'Natalie' }],
  creator: 'Real Tuesday',
  publisher: 'Real Tuesday',
  openGraph: {
    type: 'website',
    siteName: 'the Motherload',
    title: 'the Motherload',
    description: 'For moms running the whole damn show.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'the Motherload',
    description: 'For moms running the whole damn show.',
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
