'use client';

import { signIn, signOut } from 'next-auth/react';

import { NAV_ITEM_CLASS } from '../utils';

type Props = {
  authed: boolean;
  children: React.ReactNode;
};

export function AuthButton({ authed, children }: Props) {
  function handleClick() {
    if (authed) {
      signOut({ callbackUrl: '/' });
    } else {
      signIn('github');
    }
  }

  return (
    <li className="grow">
      <button type="button" className={NAV_ITEM_CLASS} onClick={handleClick}>
        {children}
      </button>
    </li>
  );
}
