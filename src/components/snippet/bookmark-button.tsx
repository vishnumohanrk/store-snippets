'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import type { RCProps } from '@/types';

type Props = RCProps & {
  title: string;
};

export function BookmarkButton({ children, title }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      title={title}
      disabled={pending}
      className="inline-flex h-full w-full items-center justify-center disabled:cursor-wait disabled:opacity-70"
    >
      {children}
    </button>
  );
}
