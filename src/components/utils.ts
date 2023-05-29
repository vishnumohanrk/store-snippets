import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Parameters<typeof twMerge>) {
  return twMerge(inputs);
}

export const NAV_ITEM_CLASS =
  'nav-item flex w-full h-16 items-center gap-3 px-4 text-neutral-400 max-md:justify-center md:h-12';

export const ICON_BTN_CLASS =
  'inline-flex h-9 w-9 items-center justify-center border-y border-e first:rounded-s-md first:border-s last:rounded-e-md hover:bg-neutral-950 disabled:cursor-wait disabled:opacity-70';
