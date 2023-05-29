import Link from 'next/link';

export function Logo() {
  return (
    <h1 className="max-md:hidden">
      <Link href="/" className="flex h-14 items-center px-4 text-2xl font-bold">
        Store Snippets
      </Link>
    </h1>
  );
}
