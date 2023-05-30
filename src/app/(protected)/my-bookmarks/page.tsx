import { notFound } from 'next/navigation';

import { SnippetCard } from '@/components/snippet/card';
import { SnippetList } from '@/components/snippet/list';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { USER_SELECT } from '@/lib/utils';

async function getBookmarks() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    notFound();
  }

  const results = await db.bookmark.findMany({
    where: { userId: currentUser.id },
    include: { snippet: true, user: { select: USER_SELECT } },
  });

  return results.map((i) => ({
    ...i.snippet,
    user: i.user,
  }));
}

export default async function MyBookmarks() {
  const snippets = await getBookmarks();

  return (
    <section>
      <SnippetList heading="My Bookmarks">
        {snippets.map((i) => (
          <SnippetCard {...i} key={i.id} variant="list" author={i.user} />
        ))}
      </SnippetList>
    </section>
  );
}
