import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageCenter } from '@/components/shared/page-center';
import { Author } from '@/components/snippet/author';
import { SnippetList } from '@/components/snippet/list';
import { USER_SELECT } from '@/lib/constants';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

type Props = {
  params: { name: string };
};

async function getUserSnippets(name: string) {
  const user = await db.user.findUnique({
    where: { userName: name },
    select: USER_SELECT,
  });

  if (!user) {
    notFound();
  }

  const [currentUser, snippets] = await Promise.all([
    getCurrentUser(),
    db.snippet.findMany({
      where: { authorId: user.id },
    }),
  ]);

  const self = currentUser?.id === user.id;

  return {
    user,
    self,
    snippets: self ? snippets : snippets.filter((i) => !i.isPrivate),
  };
}

export default async function UserPage({ params: { name } }: Props) {
  const { self, snippets, user } = await getUserSnippets(name);

  return (
    <section>
      <h2 className="sr-only">@{user.userName}&apos;s snippets</h2>
      <Author {...user} variant="userPage" />
      {snippets.length ? (
        <SnippetList snippets={snippets} />
      ) : (
        <PageCenter
          className="min-h-[85dvh]"
          text={`${
            self ? `You don't` : `@${user.userName} doesn't`
          } have any snippets yet.`}
        >
          {self && (
            <Link href="/snippet/new" className="font-bold underline">
              Create New Snippet
            </Link>
          )}
        </PageCenter>
      )}
    </section>
  );
}
