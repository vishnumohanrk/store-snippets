type Props = {
  alwaysShow?: boolean;
  children: string | string[];
};

export function NavLabel({ children, alwaysShow = false }: Props) {
  return (
    <span className={alwaysShow ? '' : 'sr-only md:not-sr-only'}>
      {children}
    </span>
  );
}
