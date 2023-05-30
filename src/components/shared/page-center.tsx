import Link from 'next/link';

import { cn } from '../utils';

type Props = React.PropsWithChildren<{
  className?: string;
  showHomeLink?: boolean;
}>;

export function PageCenter({
  children,
  className,
  showHomeLink = false,
}: Props) {
  return (
    <div
      className={cn(
        'flex min-h-[--ht] flex-col items-center justify-center gap-3 p-4',
        className
      )}
    >
      {children}
      {showHomeLink && (
        <Link href="/" className="font-medium underline">
          Go Home
        </Link>
      )}
    </div>
  );
}
