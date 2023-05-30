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
    orderBy: { createdAt: 'desc' },
    include: {
      snippet: {
        include: {
          user: { select: USER_SELECT },
        },
      },
    },
  });

  return results.map((i) => i.snippet);
}

export default async function MyBookmarks() {
  const snippets = await getBookmarks();

  return (
    <section>
      <SnippetList
        heading="My Bookmarks"
        empty={snippets.length === 0}
        emptyElem={
          <p className="text-2xl font-semibold text-neutral-400">
            You haven&apos;t bookmarked any snippets yet
          </p>
        }
      >
        {snippets.map((i) => (
          <SnippetCard {...i} key={i.id} variant="list" author={i.user} />
        ))}
      </SnippetList>
    </section>
  );
}
