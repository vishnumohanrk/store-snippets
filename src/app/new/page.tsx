import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { SnippetForm } from '@/components/snippet/form';
import { db } from '@/lib/db';
import { getSnippetFromForm } from '@/lib/utils';

async function action(formData: FormData) {
  'use server';

  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const fromForm = await getSnippetFromForm(formData);
  const snippet = await db.snippet.create({
    data: {
      ...fromForm,
      userId,
      isPrivate: formData.has('private'),
    },
  });

  redirect(`/snippet/${snippet.id}`);
}

export default function CreateNewSnippet() {
  return <SnippetForm action={action} type="create" />;
}

export const metadata = {
  title: 'Create New Snippet',
};
