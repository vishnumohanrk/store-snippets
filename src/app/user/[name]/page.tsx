import { notFound } from 'next/navigation';

import { Author } from '@/components/snippet/author';
import { SnippetCard } from '@/components/snippet/card';
import { SnippetList } from '@/components/snippet/list';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { USER_SELECT } from '@/lib/utils';

type Props = {
  params: { name: string };
};

async function getUserFromUserName(userName: string) {
  const user = await db.user.findUnique({
    where: { userName },
    select: USER_SELECT,
  });

  if (!user) {
    notFound();
  }

  return user;
}

async function getUserSnippets(id: string) {
  const [currentUser, snippets] = await Promise.all([
    getCurrentUser(),
    db.snippet.findMany({
      where: { userId: id },
      orderBy: { updatedAt: 'desc' },
    }),
  ]);

  return id === currentUser?.id
    ? snippets
    : snippets.filter((i) => !i.isPrivate);
}

export default async function UserPage({ params }: Props) {
  const user = await getUserFromUserName(params.name);
  const snippets = await getUserSnippets(user.id);

  return (
    <section>
      <Author {...user} variant="userPage" />
      <SnippetList heading={`@${params.name}'s snippets`}>
        {snippets.map((i) => (
          <SnippetCard {...i} key={i.id} variant="list" />
        ))}
      </SnippetList>
    </section>
  );
}

export function generateMetadata({ params }: Props) {
  return {
    title: `@${params.name}'s snippets`,
  };
}
