import type { Snippet } from '@prisma/client';

import { SnippetCard } from './card';

export function SnippetList({ snippets }: { snippets: Snippet[] }) {
  return (
    <ul className="space-y-6">
      {snippets.map((i) => (
        <SnippetCard {...i} key={i.id} variant="list" />
      ))}
    </ul>
  );
}
