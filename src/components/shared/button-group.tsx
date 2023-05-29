import { Slot } from '@radix-ui/react-slot';

import type { RCProps } from '@/types';

import { cn } from '../utils';

type Props = RCProps & {
  asChild?: boolean;
  className?: string;
};

export function ButtonGroup({ children, asChild = false, className }: Props) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        'flex justify-end gap-4 max-md:flex-wrap max-md:[&>*]:w-full',
        className
      )}
    >
      {children}
    </Comp>
  );
}
