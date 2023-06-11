import type { RCProps } from '@/types';

import { PageCenter } from '../shared/page-center';

type Props = RCProps & {
  heading: string;
  empty?: boolean;
  emptyElem?: React.ReactNode;
};

export function SnippetList({ heading, children, empty, emptyElem }: Props) {
  return (
    <>
      <h2 className="sr-only">{heading}</h2>
      {empty ? (
        <PageCenter className="min-h-[75svh]">{emptyElem}</PageCenter>
      ) : (
        <ul className="space-y-6">{children}</ul>
      )}
    </>
  );
}
