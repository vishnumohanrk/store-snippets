import 'server-only';

import { clerkClient } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/server';
import type { Snippet } from '@prisma/client';
import { notFound } from 'next/navigation';

import type { TAuthorDetails } from '@/types';

function mapUserForUI(user: User) {
  return {
    id: user.id,
    username: user.username,
    imageUrl: user.imageUrl,
  } satisfies TAuthorDetails;
}

export async function getUserFromId(id: string) {
  const user = await clerkClient.users.getUser(id);
  return mapUserForUI(user);
}

export async function getUserFromUserName(username: string) {
  const [user] = await clerkClient.users.getUserList({
    username: [username],
  });

  if (!user) {
    notFound();
  }

  return mapUserForUI(user);
}

function reduceUserList(userList: User[]) {
  return userList.reduce<Record<string, TAuthorDetails>>((acc, curr) => {
    acc[curr.id] = mapUserForUI(curr);
    return acc;
  }, {});
}

export async function mapSnippetsWithUser(snippets: Snippet[]) {
  const userIds = snippets.map((i) => i.userId);
  const userList = await clerkClient.users.getUserList({
    userId: userIds,
  });

  const users = reduceUserList(userList);

  return snippets.map((i) => ({
    ...i,
    author: users[i.userId],
  }));
}
