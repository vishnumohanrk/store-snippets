import { auth, clerkClient } from '@clerk/nextjs';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { SnippetAction } from '@/components/snippet/action';
import { BookmarkForm } from '@/components/snippet/bookmark';
import { SnippetCard } from '@/components/snippet/card';
import { EditLink } from '@/components/snippet/edit-link';
import { filterUserForUI } from '@/lib/clerk';
import { db } from '@/lib/db';
import type { SnippetPageProps } from '@/types';

async function getUserById(id: string) {
  const user = await clerkClient.users.getUser(id);
  return filterUserForUI(user);
}

const getSnippetById = cache(async (id: string) => {
  const { userId } = auth();
  const snippet = await db.snippet.findUnique({
    where: { id },
    include: {
      bookmarks: { select: { userId: true } },
    },
  });

  const isOwner = snippet?.authorId === userId;

  if (!snippet || (snippet.isPrivate && !isOwner)) {
    notFound();
  }

  const author = await getUserById(snippet.authorId);
  const isBookmarked = userId
    ? snippet.bookmarks.some((i) => i.userId === userId)
    : null;

  return { ...snippet, author, isBookmarked, isOwner };
});

export default async function SnippetPage({ params }: SnippetPageProps) {
  const { isBookmarked, isOwner, ...snippet } = await getSnippetById(params.id);

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

// export async function generateMetadata({ params }: SnippetPageProps) {
//   const { title } = await getSnippetById(params.id);

//   return {
//     title,
//   };
// }
