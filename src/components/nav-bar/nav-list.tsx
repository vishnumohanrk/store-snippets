import {
  MdAddCircle,
  MdAddCircleOutline,
  MdBookmark,
  MdBookmarkBorder,
  MdCode,
  MdExplore,
  MdLogin,
  MdLogout,
  MdOutlineExplore,
} from 'react-icons/md';

import { getCurrentUser } from '@/lib/session';

import { AuthButton } from './auth-button';
import { NavItem } from './nav-item';
import { NavLabel } from './nav-label';

export async function NavList() {
  const currentUser = await getCurrentUser();
  const authed = !!currentUser?.userName;

  return (
    <>
      <NavItem
        href="/"
        activeIcon={<MdExplore />}
        icon={<MdOutlineExplore />}
        label={<NavLabel authed={authed} text="Discover" />}
      />
      {authed && (
        <>
          <NavItem
            icon={<MdCode />}
            // @ts-expect-error TODO
            href={`/user/${currentUser.userName}`}
            label={<NavLabel text="My Snippets" />}
          />
          <NavItem
            href="/snippet/new"
            icon={<MdAddCircleOutline />}
            activeIcon={<MdAddCircle />}
            label={<NavLabel text="Create Snippet" />}
          />
          <NavItem
            href="/bookmarks"
            icon={<MdBookmarkBorder />}
            activeIcon={<MdBookmark />}
            label={<NavLabel text="My Bookmarks" />}
          />
        </>
      )}
      <AuthButton authed={authed}>
        {authed ? <MdLogout /> : <MdLogin />}
        <NavLabel authed={authed} text={`Sign ${authed ? 'out' : 'in'}`} />
      </AuthButton>
    </>
  );
}
