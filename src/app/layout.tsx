import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js 16 Advanced Starter',
  description: 'Production-ready Next.js starter with modern features',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Just return children - locale layout handles <html> and <body>
  return children;
}
