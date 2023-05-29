'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { RCProps } from '@/types';

import { cn, NAV_ITEM_CLASS } from '../utils';

type Props = RCProps & {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  href: React.ComponentProps<typeof Link>['href'];
};

export function NavItem({ activeIcon, icon, href, children }: Props) {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(NAV_ITEM_CLASS, isActive && 'text-neutral-50')}
      >
        {isActive && activeIcon ? activeIcon : icon}
        {children}
      </Link>
    </li>
  );
}
