import { notFound } from 'next/navigation';

import { SnippetAction } from '@/components/snippet/action';
import { BookmarkForm } from '@/components/snippet/bookmark';
import { SnippetCard } from '@/components/snippet/card';
import { EditLink } from '@/components/snippet/edit-link';
import { USER_SELECT } from '@/lib/constants';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import type { SnippetPageProps } from '@/types';

async function getSnippetById(id: string) {
  const [currentUser, snippet] = await Promise.all([
    getCurrentUser(),
    db.snippet.findUnique({
      where: { id },
      include: {
        author: { select: USER_SELECT },
        bookmarks: { select: { userId: true } },
      },
    }),
  ]);

  const isOwner = currentUser?.id === snippet?.authorId;

  if (!snippet || (snippet.isPrivate && !isOwner)) {
    notFound();
  }

  const isBookmarked = currentUser?.id
    ? snippet.bookmarks.some((i) => i.userId === currentUser.id)
    : null;

  return { snippet, isBookmarked, isOwner };
}

export default async function SnippetPage({ params }: SnippetPageProps) {
  const { isBookmarked, isOwner, snippet } = await getSnippetById(params.id);

  return (
    <>
      <SnippetCard {...snippet} variant="full">
        {isOwner && <EditLink id={snippet.id} />}
        {isBookmarked !== null && (
          <BookmarkForm id={snippet.id} isBookmarked={isBookmarked} />
        )}
      </SnippetCard>
      {isOwner && (
        <SnippetAction id={snippet.id} isPrivate={snippet.isPrivate} />
      )}
    </>
  );
}

export const fetchCache = 'default-cache';
