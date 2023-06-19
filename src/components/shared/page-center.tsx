import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type Props = React.PropsWithChildren<{
  text?: string;
  className?: string;
  showHomeLink?: boolean;
}>;

export function PageCenter({
  text,
  children,
  className,
  showHomeLink = false,
}: Props) {
  return (
    <div
      className={twMerge(
        'flex min-h-[--ht] flex-col items-center justify-center gap-3 p-4',
        className
      )}
    >
      {text && (
        <p className="text-center text-3xl font-bold text-neutral-400">
          {text}
        </p>
      )}
      {children}
      {showHomeLink && (
        <Link href="/" className="font-medium underline">
          Go Home
        </Link>
      )}
    </div>
  );
}
