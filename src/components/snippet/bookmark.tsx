import { revalidatePath } from 'next/cache';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

import { ICON_BTN_CLASS } from '../utils';
import { BookmarkButton } from './bookmark-button';

type Props = {
  id: string;
  isBookmarked: boolean;
};

async function bookmarkSnippet(id: string, isBookmarked: boolean) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('Unauthorized');
  }

  const obj = {
    snippetId: id,
    userId: currentUser.id,
  };

  if (isBookmarked) {
    await db.bookmark.deleteMany({
      where: obj,
    });
  } else {
    await db.bookmark.create({
      data: obj,
    });
  }

  revalidatePath('/snippet/:id');
  revalidatePath('/my-bookmarks');
}

export function BookmarkForm({ id, isBookmarked }: Props) {
  async function bookmarkAction() {
    'use server';
    await bookmarkSnippet(id, isBookmarked);
  }

  const Icon = isBookmarked ? MdBookmark : MdBookmarkBorder;

  return (
    <form action={bookmarkAction} className={ICON_BTN_CLASS}>
      <BookmarkButton title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}>
        <Icon size={19} />
      </BookmarkButton>
    </form>
  );
}
