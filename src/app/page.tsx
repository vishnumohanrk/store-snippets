import { SnippetCard } from '@/components/snippet/card';
import { SnippetList } from '@/components/snippet/list';
import { mapSnippetsWithAuthor } from '@/lib/clerk';
import { db } from '@/lib/db';

async function getPublicSnippets() {
  const snippets = await db.snippet.findMany({
    where: { isPrivate: false },
    orderBy: { updatedAt: 'desc' },
  });

  return mapSnippetsWithAuthor(snippets);
}

export default async function AppHome() {
  const snippets = await getPublicSnippets();

  return (
    <section>
      <SnippetList heading="Discover Public Snippets">
        {snippets.map((i) => (
          <SnippetCard {...i} key={i.id} variant="list" />
        ))}
      </SnippetList>
    </section>
  );
}

// export const metadata = {
//   title: 'Discover Public Snippets',
// };
