import { SnippetCard } from '@/components/snippet/card';
import { SnippetList } from '@/components/snippet/list';
import { db } from '@/lib/db';
import { USER_SELECT } from '@/lib/utils';

async function getAllPublicSnippets() {
  const snippets = await db.snippet.findMany({
    where: { isPrivate: false },
    orderBy: { updatedAt: 'desc' },
    include: { user: { select: USER_SELECT } },
  });

  return snippets;
}

export default async function AppHome() {
  const snippets = await getAllPublicSnippets();

  return (
    <section>
      <SnippetList heading="All Public Snippets">
        {snippets.map((i) => (
          <SnippetCard {...i} key={i.id} variant="list" author={i.user} />
        ))}
      </SnippetList>
    </section>
  );
}

export const metadata = {
  title: 'Discover',
};

export const dynamic = 'force-dynamic';
