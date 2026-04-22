import './globals.css';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'KarirHub Starter',
  description: 'Web-based career development platform starter project.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
