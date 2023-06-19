'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { NAV_ITEM_CLASS } from '../utils';

type Props = {
  label: React.ReactNode;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  href: React.ComponentProps<typeof Link>['href'];
};

export function NavItem({ activeIcon, icon, href, label }: Props) {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <li className="grow">
      <Link
        href={href}
        className={twMerge(NAV_ITEM_CLASS, isActive && 'text-neutral-50')}
      >
        {isActive && activeIcon ? activeIcon : icon}
        {label}
      </Link>
    </li>
  );
}
