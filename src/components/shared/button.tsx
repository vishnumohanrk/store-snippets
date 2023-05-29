import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

import { cn } from '../utils';

export type ButtonProps = {
  asChild?: boolean;
  variant: 'primary' | 'secondary' | 'danger';
} & React.ComponentPropsWithRef<'button'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, type, asChild, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        {...rest}
        ref={ref}
        type={type || 'button'}
        className={cn(
          'inline-flex items-center justify-center gap-x-3 rounded-md px-8 py-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70',
          variant === 'primary' &&
            'bg-neutral-50 text-neutral-950 hover:bg-neutral-300',
          variant === 'secondary' && 'border hover:bg-neutral-800',
          variant === 'danger' && 'bg-red-700 hover:bg-red-800',
          className
        )}
      />
    );
  }
);

Button.displayName = 'Button';
