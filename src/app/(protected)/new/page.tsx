import { redirect } from 'next/navigation';

import { SnippetForm } from '@/components/snippet/form';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { getSnippetFromForm } from '@/lib/utils';

async function action(formData: FormData) {
  'use server';

  const [currentUser, fromForm] = await Promise.all([
    getCurrentUser(),
    getSnippetFromForm(formData),
  ]);

  if (!currentUser) {
    throw new Error('Unauthorized');
  }

  const snippet = await db.snippet.create({
    data: {
      ...fromForm,
      userId: currentUser.id,
      isPrivate: formData.has('private'),
    },
    select: { id: true },
  });

  redirect(`/snippet/${snippet.id}`);
}

export default function CreateNewSnippet() {
  return <SnippetForm action={action} type="create" />;
}

export const metadata = {
  title: 'Create New Snippet',
};
