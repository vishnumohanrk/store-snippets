import type { RCProps } from '@/types';

type Props = RCProps & {
  heading: string;
};

export function SnippetList({ children, heading }: Props) {
  return (
    <>
      <h2 className="sr-only">{heading}</h2>
      <ul className="space-y-6 pb-20">{children}</ul>
    </>
  );
}
