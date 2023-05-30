import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { Author } from '@/components/snippet/author';
import { SnippetCard } from '@/components/snippet/card';
import { SnippetList } from '@/components/snippet/list';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { USER_SELECT } from '@/lib/utils';

type Props = {
  params: { name: string };
};

const getUserFromUserName = cache(async (userName: string) => {
  const user = await db.user.findUnique({
    where: { userName },
    select: USER_SELECT,
  });

  if (!user) {
    notFound();
  }

  return user;
});

async function getUserSnippets(id: string) {
  const [currentUser, snippets] = await Promise.all([
    getCurrentUser(),
    db.snippet.findMany({
      where: { userId: id },
      orderBy: { updatedAt: 'desc' },
    }),
  ]);

  const isOwner = id === currentUser?.id;

  return {
    isOwner,
    snippets: isOwner ? snippets : snippets.filter((i) => !i.isPrivate),
  };
}

export default async function UserPage({ params }: Props) {
  const user = await getUserFromUserName(params.name);
  const { isOwner, snippets } = await getUserSnippets(user.id);

  return (
    <section>
      <Author {...user} variant="userPage" />
      <SnippetList
        empty={snippets.length === 0}
        heading={`@${user.userName}'s snippets`}
        emptyElem={
          <>
            <p className="text-2xl font-semibold text-neutral-400">
              {isOwner ? `You don't` : `${user.userName} doesn't`} have any
              snippets yet.
            </p>
            {isOwner && (
              <Link href="/new" className="font-bold underline">
                Create New Snippet
              </Link>
            )}
          </>
        }
      >
        {snippets.map((i) => (
          <SnippetCard {...i} key={i.id} variant="list" />
        ))}
      </SnippetList>
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const { userName } = await getUserFromUserName(params.name);

  return {
    title: `${userName}'s snippets`,
  };
}
