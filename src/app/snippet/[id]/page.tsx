import { auth } from '@clerk/nextjs';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { BookmarkButton } from '@/components/snippet/bookmark-button';
import { SnippetCard } from '@/components/snippet/card';
import { EditLink } from '@/components/snippet/edit-link';
import { getUserFromId } from '@/lib/clerk';
import { db } from '@/lib/db';
import type { SnippetPageProps } from '@/types';

const getSnippetById = cache(async (id: string) => {
  const snippet = await db.snippet.findUnique({
    where: { id },
    include: { bookmarks: { select: { userId: true } } },
  });

  const { userId } = auth();
  const isOwner = snippet?.userId === userId;

  if (!snippet || (snippet.isPrivate && !isOwner)) {
    notFound();
  }

  const isBookmarked = userId
    ? snippet.bookmarks.some((i) => i.userId === userId)
    : null;

  return { ...snippet, isBookmarked, isOwner };
});

export default async function SnippetPage({ params }: SnippetPageProps) {
  const { isBookmarked, isOwner, ...snippet } = await getSnippetById(params.id);
  const author = await getUserFromId(snippet.userId);

  return (
    <>
      <SnippetCard {...snippet} author={author} variant="full">
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
