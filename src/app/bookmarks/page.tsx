import { PageCenter } from '@/components/shared/page-center';
import { SnippetList } from '@/components/snippet/list';
import { USER_SELECT } from '@/lib/constants';
import { db } from '@/lib/db';
import { getAuthUserId } from '@/lib/session';

async function getBookmarks() {
  const userId = await getAuthUserId();
  const snippets = await db.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      snippet: {
        include: {
          author: { select: USER_SELECT },
        },
      },
    },
  });

  return snippets.map((i) => i.snippet);
}

export default async function BookmarksPage() {
  const snippets = await getBookmarks();

  return (
    <section>
      <h2 className="sr-only">My Bookmarks</h2>
      {snippets.length ? (
        <SnippetList snippets={snippets} />
      ) : (
        <PageCenter text="You haven't bookmarked any snippets yet" />
      )}
    </section>
  );
}
