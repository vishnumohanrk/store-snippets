import Link from 'next/link';

export function PageCenter({
  children,
  showHomeLink = false,
}: React.PropsWithChildren<{ showHomeLink?: boolean }>) {
  return (
    <div className="flex min-h-[--ht] flex-col items-center justify-center gap-3 p-4">
      {children}
      {showHomeLink && (
        <Link href="/" className="font-medium underline">
          Go Home
        </Link>
      )}
    </div>
  );
}
