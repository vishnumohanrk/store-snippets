/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import type { TSnippetVariant } from '@/types';

import { cn } from '../utils';

type Props = React.PropsWithChildren<{
  image: string;
  userName: string;
  subText: React.ReactNode;
  variant: TSnippetVariant | 'userPage';
}>;

export function Author({ variant, subText, image, userName, children }: Props) {
  const className = cn(
    variant !== 'list' && 'text-lg',
    variant !== 'userPage' && 'hover:underline',
    'font-bold text-neutral-50'
  );

  return (
    <div className="mb-4 flex items-center text-neutral-400">
      <img
        src={image}
        loading="lazy"
        alt={`@${userName}`}
        width={size[variant]}
        height={size[variant]}
        className="rounded-full object-cover"
      />
      <div className="ml-3 flex-1">
        {variant === 'userPage' ? (
          <p className={className}>{userName}</p>
        ) : (
          <Link href={`/user/${userName}`} className={className}>
            {userName}
          </Link>
        )}
        <div className="text-sm">{subText}</div>
      </div>
      {children}
    </div>
  );
}

const size = {
  full: 48,
  list: 44,
  userPage: 64,
} as const;
