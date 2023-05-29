/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import type { RCProps, TSnippetVariant } from '@/types';

import { cn } from '../utils';

type Props = RCProps & {
  image: string;
  userName: string;
  subText: React.ReactNode;
  variant: TSnippetVariant | 'userPage';
};

export function Author({ children, image, subText, userName, variant }: Props) {
  const className = cn(
    variant !== 'list' && 'text-lg',
    variant !== 'userPage' && 'hover:underline',
    'font-bold text-neutral-50'
  );

  const size = variant === 'list' ? 44 : 48;

  return (
    <div className="mb-4 flex items-center text-neutral-400">
      <img
        src={image}
        width={size}
        height={size}
        loading="lazy"
        alt={`@${userName}`}
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
