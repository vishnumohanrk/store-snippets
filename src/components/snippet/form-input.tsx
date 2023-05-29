'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

type Props = {
  name: string;
  className: string;
  placeholder: string;
  defaultValue?: string;
  variant: 'input' | 'textarea';
};

export function FormInput({ variant, ...props }: Props) {
  const { pending } = useFormStatus();
  const { name, placeholder } = props;

  const Comp = variant;

  return (
    <>
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <Comp
        {...props}
        id={name}
        disabled={pending}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={variant === 'input'}
      />
    </>
  );
}
