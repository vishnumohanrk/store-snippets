'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/shared/button';

export function SignIn({ children }: { children: React.ReactNode }) {
  function handleClick() {
    signIn('github');
  }

  return (
    <Button variant="secondary" onClick={handleClick}>
      {children}
    </Button>
  );
}
