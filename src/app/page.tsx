import { SnippetCard } from '@/components/snippet/card';
import { SnippetList } from '@/components/snippet/list';
import { mapSnippetsWithUser } from '@/lib/clerk';
import { db } from '@/lib/db';

async function getAllPublicSnippets() {
  const snippets = await db.snippet.findMany({
    where: { isPrivate: false },
    orderBy: { updatedAt: 'desc' },
  });

  return mapSnippetsWithUser(snippets);
}

export default async function AppHome() {
  const snippets = await getAllPublicSnippets();

  return (
    <section>
      <SnippetList heading="All Public Snippets">
        {snippets.map((i) => (
          <SnippetCard {...i} key={i.id} variant="list" author={i.author} />
        ))}
      </SnippetList>
    </section>
  );
}

export const metadata = {
  title: 'Discover',
};
