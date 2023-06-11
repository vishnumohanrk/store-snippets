import { auth } from '@clerk/nextjs';
import { notFound } from 'next/navigation';

import { SnippetCard } from '@/components/snippet/card';
import { SnippetList } from '@/components/snippet/list';
import { mapSnippetsWithAuthor } from '@/lib/clerk';
import { db } from '@/lib/db';

async function getBookmarks() {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const results = await db.bookmark.findMany({
    where: { userId },
    include: { snippet: true },
    orderBy: { createdAt: 'desc' },
  });

  return mapSnippetsWithAuthor(results.map((i) => i.snippet));
}

export default async function MyBookmarks() {
  const snippets = await getBookmarks();

  return (
    <section>
      <SnippetList heading="My Bookmarks">
        {snippets.map((i) => (
          <SnippetCard {...i} key={i.id} variant="list" />
        ))}
      </SnippetList>
    </section>
  );
}

// export const metadata = {
//   title: 'Bookmarks',
// };
