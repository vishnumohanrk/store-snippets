'use client';

import { forwardRef } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { Button, type ButtonProps } from './button';

export const FormButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'disabled'>
>(({ type, ...rest }, ref) => {
  const { pending } = useFormStatus();

  return (
    <Button {...rest} ref={ref} type={type || 'submit'} disabled={pending} />
  );
});

FormButton.displayName = 'FormButton';
