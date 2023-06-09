import { Suspense } from 'react';

import { Logo } from './logo';
import { NavList } from './nav-list';

export function NavBar() {
  return (
    <nav className="fixed bottom-0 z-50 w-full flex-col overflow-auto bg-neutral-900 max-md:border-t md:h-[100dvh] md:w-64 md:border-r md:p-px">
      <Logo />
      <ul className="flex md:mt-1 md:flex-col md:gap-y-1">
        <Suspense>
          <NavList />
        </Suspense>
      </ul>
    </nav>
  );
}
