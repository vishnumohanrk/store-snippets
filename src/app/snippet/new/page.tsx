import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { SnippetForm } from '@/components/snippet/form';
import { db } from '@/lib/db';
import { getAuthUserId } from '@/lib/session';
import { getFromFrom } from '@/lib/utils';

async function action(formData: FormData) {
  'use server';
  const userId = await getAuthUserId();
  const snippet = await db.snippet.create({
    data: {
      ...getFromFrom(formData),
      authorId: userId,
      isPrivate: formData.has('private'),
    },
    select: { id: true },
  });

  revalidatePath('/');
  revalidatePath('/user/[name]');
  redirect(`/snippet/${snippet.id}`);
}

export default function NewSnippetPage() {
  return <SnippetForm action={action} type="create" />;
}
