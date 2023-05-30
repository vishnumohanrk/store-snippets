import { GoMarkGithub } from 'react-icons/go';
import {
  MdAddCircle,
  MdAddCircleOutline,
  MdBookmark,
  MdBookmarkBorder,
  MdCode,
  MdExplore,
  MdLogout,
  MdOutlineExplore,
} from 'react-icons/md';

import { getCurrentUser } from '@/lib/session';

import { AuthButton } from './auth-button';
import { NavItem } from './nav-item';
import { NavLabel } from './nav-label';

export async function NavList() {
  const currentUser = await getCurrentUser();
  const isSignedIn = !!currentUser;

  return (
    <>
      <NavItem href="/" icon={<MdOutlineExplore />} activeIcon={<MdExplore />}>
        <NavLabel alwaysShow={!isSignedIn}>Discover</NavLabel>
      </NavItem>
      {isSignedIn && (
        <>
          {/* @ts-expect-error TODO */}
          <NavItem href={`/user/${currentUser.userName}`} icon={<MdCode />}>
            <NavLabel>My Snippets</NavLabel>
          </NavItem>
          <NavItem
            href="/my-bookmarks"
            icon={<MdBookmarkBorder />}
            activeIcon={<MdBookmark />}
          >
            <NavLabel>My Bookmarks</NavLabel>
          </NavItem>
          <NavItem
            href="/new"
            icon={<MdAddCircleOutline />}
            activeIcon={<MdAddCircle />}
          >
            <NavLabel>Create Snippet</NavLabel>
          </NavItem>
        </>
      )}
      <AuthButton isSignedIn={isSignedIn}>
        {isSignedIn ? <MdLogout /> : <GoMarkGithub className="scale-90" />}
        <NavLabel alwaysShow={!isSignedIn}>
          Sign {isSignedIn ? 'out' : 'in'}
        </NavLabel>
      </AuthButton>
    </>
  );
}
