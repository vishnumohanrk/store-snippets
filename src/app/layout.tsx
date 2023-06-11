import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import { NavBar } from '@/components/nav-bar';
import type { RCProps } from '@/types';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: RCProps) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="bg-neutral-950 font-sans text-neutral-50 antialiased">
          <NavBar />
          <main className="mx-auto max-w-screen-lg p-4 max-md:pb-20 md:pl-[17rem]">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

export const metadata = {
  // title: {
  //   absolute: 'Store Snippets',
  //   template: `%s | Store Snippets`,
  // },
  title: 'Store Snippets',
  description: 'A Code Snippet storing, sharing app',
};
