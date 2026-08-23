import './globals.css';
import { Manrope } from 'next/font/google';
import { ReactNode } from 'react';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'NAVYK — платформа развития навыков и карьеры',
    template: '%s · NAVYK',
  },
  description:
    'Единая экосистема для студентов, компаний и университетов Казахстана: карьерные планы, вакансии, мероприятия и аналитика в одном месте.',
  openGraph: {
    title: 'NAVYK — платформа развития навыков и карьеры',
    description:
      'Единая экосистема для студентов, компаний и университетов Казахстана.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'NAVYK',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfcfc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0b0e' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={manrope.variable}>
      <body className="font-sans antialiased min-h-[100dvh] flex flex-col bg-background">
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
