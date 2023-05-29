'use client';

import type { RCProps } from '@/types';

import { NAV_ITEM_CLASS } from '../utils';

type Props = RCProps & {
  isSignedIn: boolean;
};

export function AuthButton({ children, isSignedIn }: Props) {
  function handleClick() {
    console.log(isSignedIn);
  }

  return (
    <li>
      <button type="button" onClick={handleClick} className={NAV_ITEM_CLASS}>
        {children}
      </button>
    </li>
  );
}
