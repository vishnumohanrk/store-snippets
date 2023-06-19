import type { Snippet } from '@prisma/client';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

import type { TAuthorDetails, TSnippetVariant } from '@/types';

import { Time } from '../shared/time';
import { Author } from './author';
import { SnippetCode } from './code';
import { CopyButton } from './copy-button';
import { OverlayLink } from './overlay-link';
import { PrivateBadge } from './private-badge';

type Props = Snippet &
  React.PropsWithChildren<{
    author?: TAuthorDetails;
    variant: TSnippetVariant;
  }>;

export function SnippetCard({
  id,
  title,
  author,
  variant,
  children,
  codeText,
  isPrivate,
  updatedAt,
}: Props) {
  const Wrapper = variant === 'list' ? 'li' : Fragment;

  return (
    <Wrapper>
      {author && (
        <Author
          {...author}
          variant={variant}
          subText={<Time date={updatedAt} />}
        />
      )}
      <article className="group relative overflow-hidden rounded-md border">
        {variant === 'list' && <OverlayLink id={id} />}
        <header className="flex h-12 items-center justify-between border-b bg-neutral-900 pl-4 pr-2">
          <h3 className="line-clamp-1 grow">
            {title}
            {isPrivate && <PrivateBadge />}
          </h3>
          <div className="flex">
            {children}
            {variant === 'full' && <CopyButton text={codeText} />}
          </div>
        </header>
        <div
          className={twMerge(
            variant === 'list' ? 'max-h-64 overflow-hidden' : 'overflow-auto',
            'bright'
          )}
        >
          <SnippetCode title={title} codeText={codeText} />
        </div>
      </article>
    </Wrapper>
  );
}
