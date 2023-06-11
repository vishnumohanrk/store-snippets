import type { User } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import type { Snippet } from '@prisma/client';

import type { TAuthorDetails } from '@/types';

export function filterUserForUI(user: User) {
  return {
    id: user.id,
    username: user.username,
    imageUrl: user.imageUrl,
  } satisfies TAuthorDetails;
}

function reduceUserList(userList: User[]) {
  return userList.reduce<Record<string, TAuthorDetails>>((obj, user) => {
    obj[user.id] = filterUserForUI(user);
    return obj;
  }, {});
}

export async function mapSnippetsWithAuthor(snippets: Snippet[]) {
  // const userIds = [...new Set(snippets.map((i) => i.authorId))];

  const authorIds = Array.from(new Set(snippets.map((i) => i.authorId)));
  const userList = await clerkClient.users.getUserList({
    userId: authorIds,
  });

  const authors = reduceUserList(userList);

  return snippets.map((i) => ({
    ...i,
    author: authors[i.authorId],
  }));
}
