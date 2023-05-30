/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import type { TAuthorDetails, TSnippetVariant } from '@/types';

import { cn } from '../utils';

type Props = TAuthorDetails & {
  subText?: React.ReactNode;
  variant: TSnippetVariant | 'userPage';
};

export function Author({ subText, variant, image, userName }: Props) {
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
        src={image || ''}
        alt={`@${userName}`}
        className="rounded-full object-cover"
      />
      <div className="ml-3 flex-1">
        {variant === 'userPage' || !userName ? (
          <p className={className}>{userName ?? '[nousername]'}</p>
        ) : (
          <Link href={`/user/${userName}`} className={className}>
            {userName}
          </Link>
        )}
        <div className="text-sm">{subText}</div>
      </div>
    </div>
  );
}
