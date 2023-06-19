'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

type Props = {
  title: string;
  children: React.ReactNode;
};

export function BookmarkButton({ children, title }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      title={title}
      disabled={pending}
      className="inline-flex h-full w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}
