import './globals.css';

import { Inter } from 'next/font/google';

import { NavBar } from '@/components/nav-bar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-neutral-950 font-sans text-neutral-50 antialiased">
        <NavBar />
        <main className="mx-auto max-w-screen-lg p-4 max-md:pb-20 md:pl-[17rem]">
          {children}
        </main>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Store Snippets',
  description: 'A Code Snippet storing, sharing app',
};

export const fetchCache = 'default-cache';
