import type { TSnippetVariant } from '@/types';

import { cn } from '../utils';

export function Skeleton({ variant = 'full' }: { variant?: TSnippetVariant }) {
  return (
    <div aria-hidden>
      <div className="mb-4 flex animate-pulse items-center">
        <div className="h-12 w-12 rounded-full bg-neutral-50/50" />
        <div className="ml-3 flex-1 space-y-1">
          <TextSkeleton className="h-4 w-2/5" />
          <TextSkeleton className="h-4 w-1/5" />
        </div>
      </div>
      <div
        className={cn(
          'w-full animate-pulse overflow-hidden rounded-md border',
          variant === 'full' ? 'h-80' : 'h-56'
        )}
      >
        <div
          className={cn(
            'flex items-center border-b bg-neutral-900 px-4',
            variant === 'list' ? 'h-10' : 'h-12'
          )}
        >
          <TextSkeleton className="w-1/2" />
        </div>
        <div className="space-y-3 p-4">
          <TextSkeleton />
          <TextSkeleton className="w-3/4" />
          <TextSkeleton className="w-1/2" />
        </div>
      </div>
    </div>
  );
}

function TextSkeleton({ className = 'w-full' }) {
  return <div className={cn(className, 'h-5 rounded-md bg-neutral-50/50')} />;
}
