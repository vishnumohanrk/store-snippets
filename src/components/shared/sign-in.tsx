'use client';

import { signIn } from 'next-auth/react';

import type { RCProps } from '@/types';

import { Button } from './button';

export function SignIn({ children }: RCProps) {
  function handleClick() {
    signIn('github');
  }

  return (
    <Button variant="secondary" onClick={handleClick}>
      {children}
    </Button>
  );
}
