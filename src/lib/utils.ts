import { notFound } from 'next/navigation';

import { db } from './db';
import { getAuthUserId } from './session';

export function getFromFrom(formData: FormData) {
  const title = formData.get('title');
  const codeText = formData.get('code');

  if (typeof title === 'string' && typeof codeText === 'string') {
    return {
      title,
      codeText,
    };
  }

  throw new Error('Bad Input');
}

export async function validateOwnerAndReturn(id: string) {
  const authorId = await getAuthUserId();
  const snippet = await db.snippet.findFirst({
    where: { id, authorId },
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
}
