import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { SnippetForm } from '@/components/snippet/form';
import { db } from '@/lib/db';
import { getSnippetFromForm } from '@/lib/utils';

async function action(formData: FormData) {
  'use server';
  const { userId } = auth();
  const fromForm = await getSnippetFromForm(formData);

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const snippet = await db.snippet.create({
    data: {
      ...fromForm,
      authorId: userId,
      isPrivate: formData.has('private'),
    },
    select: { id: true },
  });

  redirect(`/snippet/${snippet.id}`);
}

export default function CreateNewSnippet() {
  return <SnippetForm action={action} type="create" />;
}

// export const metadata = {
//   title: 'Create New Snippet',
// };
