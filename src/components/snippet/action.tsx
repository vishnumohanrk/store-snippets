import type { Snippet } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { MdDelete, MdRemoveRedEye } from 'react-icons/md';

import { db } from '@/lib/db';
import { validateOwnerAndReturn } from '@/lib/utils';

import { AlertDialog } from '../shared/alert-dialog';
import { Button } from '../shared/button';
import { ButtonGroup } from '../shared/button-group';
import { FormButton } from '../shared/form-button';

async function changeVisibility(id: string) {
  const { isPrivate, authorId } = await validateOwnerAndReturn(id);

  await db.snippet.update({
    where: { id },
    data: { isPrivate: !isPrivate },
  });

  if (!isPrivate) {
    await db.bookmark.deleteMany({
      where: { snippetId: id, NOT: { userId: authorId } },
    });
  }

  revalidatePath('/');
  revalidatePath('/user/[name]');
  revalidatePath('/bookmarks');
  redirect(`/snippet/${id}`);
}

async function deleteSnippet(id: string) {
  await validateOwnerAndReturn(id);
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath('/user/[name]');
  revalidatePath('/bookmarks');
  redirect('/');
}

export function SnippetAction({
  id,
  isPrivate,
}: Pick<Snippet, 'id' | 'isPrivate'>) {
  async function visibilityAction() {
    'use server';
    await changeVisibility(id);
  }

  async function deleteAction() {
    'use server';
    await deleteSnippet(id);
  }

  return (
    <ButtonGroup className="mt-4">
      <AlertDialog
        action={visibilityAction}
        actionElem={<FormButton variant="primary">Yes</FormButton>}
        description={isPrivate ? description.public : description.private}
      >
        <Button variant="secondary">
          <MdRemoveRedEye size={20} />
          Make {isPrivate ? 'Public' : 'Private'}
        </Button>
      </AlertDialog>
      <AlertDialog
        action={deleteAction}
        description={description.delete}
        actionElem={<FormButton variant="danger">Yes</FormButton>}
      >
        <Button variant="danger">
          <MdDelete size={20} />
          Delete Snippet
        </Button>
      </AlertDialog>
    </ButtonGroup>
  );
}

const description = {
  public: 'This will make the snippet public, making it visible to everyone.',
  private:
    'This will make the snippet snippet private. It will be visible only to you.',
  delete:
    'This action cannot be undone. This will permanently delete this snippet.',
};
