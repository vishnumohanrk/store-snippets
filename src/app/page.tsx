import { SnippetList } from '@/components/snippet/list';
import { USER_SELECT } from '@/lib/constants';
import { db } from '@/lib/db';

async function getPublicSnippets() {
  const snippets = await db.snippet.findMany({
    where: { isPrivate: false },
    orderBy: { updatedAt: 'desc' },
    include: {
      author: {
        select: USER_SELECT,
      },
    },
  });

  return snippets;
}

export default async function AppHome() {
  const snippets = await getPublicSnippets();

  return (
    <section>
      <h2 className="sr-only">Discover Public Snippets</h2>
      <SnippetList snippets={snippets} />
    </section>
  );
}

export const fetchCache = 'default-cache';
