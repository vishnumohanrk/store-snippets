import 'server-only';

import { auth } from '@clerk/nextjs';
import type { Snippet } from '@prisma/client';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { db } from './db';
import { highlightCode } from './shiki';

export async function getSnippetFromForm(formData: FormData) {
  const { title, code } = Object.fromEntries(formData);

  if (typeof title !== 'string' || typeof code !== 'string') {
    throw new Error('Bad Input');
  }

  const extension = title.split('.').at(-1) || '';
  const codeHTML = await highlightCode(code, extension);

  return {
    title,
    codeHTML,
    codeText: code,
  } satisfies Pick<Snippet, 'codeHTML' | 'codeText' | 'title'>;
}

export const validateOwnerAndReturn = cache(async (id: string) => {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const snippet = await db.snippet.findFirst({
    where: { id, authorId: userId },
    select: {
      title: true,
      codeText: true,
      authorId: true,
      isPrivate: true,
    },
  });

  if (!snippet) {
    notFound();
  }

  return snippet;
});
