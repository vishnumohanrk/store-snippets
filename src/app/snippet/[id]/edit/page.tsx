import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';

import { SnippetForm } from '@/components/snippet/form';
import { db } from '@/lib/db';
import { getSnippetFromForm } from '@/lib/utils';
import type { SnippetPageProps } from '@/types';

const validateAndReturn = cache(async (id: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const snippet = await db.snippet.findFirst({
    where: { id, userId },
    select: { title: true, codeText: true },
  });

  if (!snippet) {
    notFound();
  }

  return snippet;
});

async function updateSnippet(id: string, formData: FormData) {
  const [fromForm] = await Promise.all([
    getSnippetFromForm(formData),
    validateAndReturn(id),
  ]);

  await db.snippet.update({
    where: { id },
    data: fromForm,
  });

  redirect(`/snippet/${id}`);
}

export default async function EditPage({ params }: SnippetPageProps) {
  const { title, codeText } = await validateAndReturn(params.id);

  async function updateAction(formData: FormData) {
    'use server';
    updateSnippet(params.id, formData);
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

export async function generateMetadata({ params }: SnippetPageProps) {
  const { title } = await validateAndReturn(params.id);

  return {
    title: `Editing ${title}`,
  };
}
