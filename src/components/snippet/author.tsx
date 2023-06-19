/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import type { TAuthorDetails, TSnippetVariant } from '@/types';

type Props = TAuthorDetails & {
  subText?: React.ReactNode;
  variant: TSnippetVariant | 'userPage';
};

export function Author({ subText, variant, image, userName }: Props) {
  const className = twMerge(
    variant !== 'list' && 'text-lg',
    variant !== 'userPage' && 'hover:underline',
    'font-bold'
  );

  const size = variant === 'list' ? 44 : 48;

  return (
    <div className="mb-4 flex items-center gap-3">
      {image && (
        <img
          src={image}
          width={size}
          height={size}
          loading="lazy"
          alt={`@${userName}`}
          className="rounded-full object-cover"
        />
      )}
      <div className="grow">
        {variant === 'userPage' || !userName ? (
          <p className={className}>{userName ?? '[nousername]'}</p>
        ) : (
          <Link href={`/user/${userName}`} className={className}>
            {userName}
          </Link>
        )}
        <div className="text-sm text-neutral-400">{subText}</div>
      </div>
    </div>
  );
}
