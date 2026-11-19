import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Harris Mir — Data, Intelligence & Technology',
  description: 'The digital portfolio of Harris Mir, a student exploring Data Science, Artificial Intelligence, and modern software engineering.',
  openGraph: {
    title: 'Harris Mir — Data, Intelligence & Technology',
    description: 'Learning, building, and exploring intelligent systems.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
