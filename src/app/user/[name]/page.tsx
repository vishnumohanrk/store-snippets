import { auth } from '@clerk/nextjs';

import { Author } from '@/components/snippet/author';
import { SnippetCard } from '@/components/snippet/card';
import { SnippetList } from '@/components/snippet/list';
import { getUserFromUserName } from '@/lib/clerk';
import { db } from '@/lib/db';

type Props = { params: { name: string } };

async function getUserSnippets(id: string) {
  const snippets = await db.snippet.findMany({
    where: { userId: id },
    orderBy: { updatedAt: 'desc' },
  });

  const { userId } = auth();

  return id === userId ? snippets : snippets.filter((i) => !i.isPrivate);
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
