import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { SnippetForm } from '@/components/snippet/form';
import { db } from '@/lib/db';
import { getSnippetFromForm, validateOwnerAndReturn } from '@/lib/utils';
import type { SnippetPageProps } from '@/types';

async function updateSnippet(id: string, formData: FormData) {
  const [fromForm] = await Promise.all([
    getSnippetFromForm(formData),
    validateOwnerAndReturn(id),
  ]);

  await db.snippet.update({
    where: { id },
    data: fromForm,
  });

  revalidatePath('/');
  revalidatePath('/user/[name]');
  revalidatePath('/bookmarks');
  redirect(`/snippet/${id}`);
}

export default async function EditPage({ params }: SnippetPageProps) {
  const { title, codeText } = await validateOwnerAndReturn(params.id);

  async function updateAction(formData: FormData) {
    'use server';
    await updateSnippet(params.id, formData);
  }

  return (
    <SnippetForm
      type="update"
      defaultTitle={title}
      action={updateAction}
      defaultContent={codeText}
    />
  );
}

// export async function generateMetadata({ params }: SnippetPageProps) {
//   const { title } = await validateOwnerAndReturn(params.id);

//   return {
//     title: `Editing ${title}`,
//   };
// }
