import type { TSnippetVariant } from '@/types';

import { cn } from '../utils';
import { CopyButton } from './copy-button';
import { OverlayLink } from './overlay-link';
import { PrivateBadge } from './private-badge';

type Props = React.PropsWithChildren<{
  id: string;
  title: string;
  codeText: string;
  codeHTML: string;
  isPrivate: boolean;
  variant: TSnippetVariant;
}>;

export function SnippetCard({
  id,
  title,
  variant,
  codeHTML,
  codeText,
  isPrivate,
  children,
}: Props) {
  return (
    <article className="group relative overflow-hidden rounded-md border">
      {variant === 'list' && <OverlayLink id={id} />}
      <header
        className={cn(
          'flex items-center justify-between border-b bg-neutral-900 pl-4 pr-2',
          variant === 'list' ? 'h-10' : 'h-12'
        )}
      >
        <h3 className="line-clamp-1 flex-1">
          {title}
          {isPrivate && <PrivateBadge />}
        </h3>
        <div className="flex">
          {children}
          {variant === 'full' && <CopyButton text={codeText} />}
        </div>
      </header>
      <p
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        className={cn(
          variant === 'list' ? 'max-h-64 overflow-hidden' : 'overflow-auto',
          'p-4'
        )}
      />
    </article>
  );
}
