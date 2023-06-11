import { currentUser } from '@clerk/nextjs';
import {
  MdAddCircle,
  MdAddCircleOutline,
  MdBookmark,
  MdBookmarkBorder,
  MdCode,
  MdExplore,
  MdOutlineExplore,
} from 'react-icons/md';

import { AuthButton } from './auth-button';
import { NavItem } from './nav-item';
import { NavLabel } from './nav-label';

export async function NavList() {
  const user = await currentUser();

  return (
    <>
      <NavItem href="/" icon={<MdOutlineExplore />} activeIcon={<MdExplore />}>
        <NavLabel alwaysShow={!user}>Discover</NavLabel>
      </NavItem>
      {user && (
        <>
          {/* @ts-expect-error TODO */}
          <NavItem href={`/user/${user.username}`} icon={<MdCode />}>
            <NavLabel>My Snippets</NavLabel>
          </NavItem>
          <NavItem
            href="/bookmarks"
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
      <AuthButton authed={!!user} />
    </>
  );
}
