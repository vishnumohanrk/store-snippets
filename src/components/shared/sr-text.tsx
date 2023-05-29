import { cn } from '../utils';

type Props = {
  alwaysShow?: boolean;
  children: string | string[];
};

export function SRText({ children, alwaysShow = false }: Props) {
  return (
    <span className={cn(!alwaysShow && 'sr-only md:not-sr-only')}>
      {children}
    </span>
  );
}
