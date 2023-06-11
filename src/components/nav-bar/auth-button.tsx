import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { MdLogin, MdLogout } from 'react-icons/md';

import { NAV_ITEM_CLASS } from '../utils';
import { NavLabel } from './nav-label';

export function AuthButton({ authed }: { authed: boolean }) {
  const Comp = authed ? SignOutButton : SignInButton;

  return (
    <li className="w-full">
      <Comp mode="modal">
        <button type="button" className={NAV_ITEM_CLASS}>
          {authed ? <MdLogout /> : <MdLogin />}
          <NavLabel alwaysShow={!authed}>Sign {authed ? 'out' : 'in'}</NavLabel>
        </button>
      </Comp>
    </li>
  );
}
