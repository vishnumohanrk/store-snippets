import { notFound } from 'next/navigation';
import { cache } from 'react';

import { BookmarkButton } from '@/components/snippet/bookmark-button';
import { SnippetCard } from '@/components/snippet/card';
import { EditLink } from '@/components/snippet/edit-link';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { USER_SELECT } from '@/lib/utils';
import type { SnippetPageProps } from '@/types';

const getSnippetById = cache(async (id: string) => {
  const [currentUser, snippet] = await Promise.all([
    getCurrentUser(),
    db.snippet.findUnique({
      where: { id },
      include: {
        user: { select: USER_SELECT },
        bookmarks: { select: { userId: true } },
      },
    }),
  ]);

  const isOwner = snippet?.userId === currentUser?.id;

  if (!snippet || (snippet.isPrivate && !isOwner)) {
    notFound();
  }

  const isBookmarked = currentUser
    ? snippet.bookmarks.some((i) => i.userId === currentUser.id)
    : null;

  return { ...snippet, isBookmarked, isOwner };
});

export default async function SnippetPage({ params }: SnippetPageProps) {
  const { isBookmarked, isOwner, ...snippet } = await getSnippetById(params.id);

  return (
    <>
      <SnippetCard {...snippet} author={snippet.user} variant="full">
        {isOwner && <EditLink id={snippet.id} />}
        {isBookmarked !== null && (
          <BookmarkButton isBookmarked={isBookmarked} />
        )}
      </SnippetCard>
    </>
  );
}

export async function generateMetadata({ params }: SnippetPageProps) {
  const { title } = await getSnippetById(params.id);

  return {
    title,
  };
}
