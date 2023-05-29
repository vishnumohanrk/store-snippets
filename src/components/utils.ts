import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Parameters<typeof twMerge>) {
  return twMerge(inputs);
}

export const NAV_ITEM_CLASS =
  'nav-item flex w-full h-16 items-center gap-3 px-4 text-neutral-400 max-md:justify-center md:h-12';
