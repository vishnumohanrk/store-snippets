import type { RCProps } from '@/types';

import { cn } from '../utils';

type Props = RCProps & {
  wrap?: boolean;
  className?: string;
  action?: React.ComponentProps<'form'>['action'];
};

export function ButtonGroup({ className, wrap = true, ...rest }: Props) {
  const Comp = rest.action ? 'form' : 'div';

  return (
    <Comp
      {...rest}
      className={cn(
        'flex justify-end gap-4',
        wrap && 'max-md:flex-wrap max-md:[&>*]:w-full',
        className
      )}
    />
  );
}
