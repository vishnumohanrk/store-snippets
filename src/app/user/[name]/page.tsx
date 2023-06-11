import { auth, clerkClient } from '@clerk/nextjs';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { Author } from '@/components/snippet/author';
import { SnippetCard } from '@/components/snippet/card';
import { SnippetList } from '@/components/snippet/list';
import { filterUserForUI } from '@/lib/clerk';
import { db } from '@/lib/db';

type Props = {
  params: { name: string };
};

const getUserByUserName = cache(async (name: string) => {
  const [user] = await clerkClient.users.getUserList({
    username: [name],
  });

  if (!user) {
    notFound();
  }

  return filterUserForUI(user);
});

async function getUserSnippets(authorId: string) {
  const { userId } = auth();
  const snippets = await db.snippet.findMany({
    where: { authorId },
    orderBy: { updatedAt: 'desc' },
  });

  const self = authorId === userId;

  return {
    self,
    snippets: self ? snippets : snippets.filter((i) => !i.isPrivate),
  };
}

export default async function UserPage({ params }: Props) {
  const user = await getUserByUserName(params.name);
  const { snippets } = await getUserSnippets(user.id);

  return (
    <section>
      <Author {...user} variant="userPage" />
      <SnippetList heading={`@${user.username}'s snippets`}>
        {snippets.map((i) => (
          <SnippetCard {...i} key={i.id} variant="list" />
        ))}
      </SnippetList>
    </section>
  );
}

// export async function generateMetadata({ params }: Props) {
//   const { username } = await getUserByUserName(params.name);

//   return {
//     title: `${username}'s snippets`,
//   };
// }
