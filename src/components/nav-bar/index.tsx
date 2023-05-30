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

import { SRText } from '../shared/sr-text';
import { AuthButton } from './auth-button';
import { Logo } from './logo';
import { NavItem } from './nav-item';

// TODOasync : refactor
export async function NavBar() {
  const currentUser = await getCurrentUser();

  const isSignedIn = !!currentUser;

  return (
    <nav className="fixed bottom-0 z-50 w-full flex-col overflow-auto bg-neutral-900 max-md:border-t md:h-[100svh] md:w-64 md:border-r md:p-px">
      <Logo />
      <ul className="flex md:mt-1 md:flex-col md:gap-y-1 [&>*]:w-full">
        <NavItem
          href="/"
          icon={<MdOutlineExplore />}
          activeIcon={<MdExplore />}
        >
          <SRText alwaysShow={!isSignedIn}>Discover</SRText>
        </NavItem>

        {isSignedIn && (
          <>
            {/* @ts-expect-error TODO */}
            <NavItem href={`/user/${currentUser.userName}`} icon={<MdCode />}>
              <SRText>My Snippets</SRText>
            </NavItem>
            <NavItem
              href="/my-bookmarks"
              icon={<MdBookmarkBorder />}
              activeIcon={<MdBookmark />}
            >
              <SRText>My Bookmarks</SRText>
            </NavItem>
            <NavItem
              href="/new"
              icon={<MdAddCircleOutline />}
              activeIcon={<MdAddCircle />}
            >
              <SRText>Create Snippet</SRText>
            </NavItem>
          </>
        )}

        <AuthButton isSignedIn={isSignedIn}>
          {isSignedIn ? <MdLogout /> : <GoMarkGithub className="scale-90" />}
          <SRText alwaysShow={!isSignedIn}>
            Sign {isSignedIn ? 'out' : 'in'}
          </SRText>
        </AuthButton>
      </ul>
    </nav>
  );
}
