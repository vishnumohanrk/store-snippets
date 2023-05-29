/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import type { TAuthorDetails, TSnippetVariant } from '@/types';

import { cn } from '../utils';

type Props = TAuthorDetails & {
  subText?: React.ReactNode;
  variant: TSnippetVariant | 'userPage';
};

export function Author({ subText, variant, username, imageUrl }: Props) {
  const className = cn(
    variant !== 'list' && 'text-lg',
    variant !== 'userPage' && 'hover:underline',
    'font-bold text-neutral-50'
  );

  const size = variant === 'list' ? 44 : 48;

  return (
    <div className="mb-4 flex items-center text-neutral-400">
      <img
        width={size}
        height={size}
        loading="lazy"
        src={imageUrl}
        alt={`@${username}`}
        className="rounded-full object-cover"
      />
      <div className="ml-3 flex-1">
        {variant === 'userPage' || !username ? (
          <p className={className}>{username ?? '[nousername]'}</p>
        ) : (
          <Link href={`/user/${username}`} className={className}>
            {username}
          </Link>
        )}
        <div className="text-sm">{subText}</div>
      </div>
    </div>
  );
}
