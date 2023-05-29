import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

import { ICON_BTN_CLASS } from '../utils';

type Props = {
  isBookmarked: boolean;
};

export function BookmarkButton({ isBookmarked }: Props) {
  const Icon = isBookmarked ? MdBookmark : MdBookmarkBorder;

  return (
    <button
      type="submit"
      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
      className={ICON_BTN_CLASS}
    >
      <Icon size={19} />
    </button>
  );
}
