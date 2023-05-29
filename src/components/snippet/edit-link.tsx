import Link from 'next/link';
import { MdModeEditOutline } from 'react-icons/md';

import { ICON_BTN_CLASS } from '@/components/utils';

export function EditLink({ id }: { id: string }) {
  return (
    <Link
      title="Edit Snippet"
      className={ICON_BTN_CLASS}
      href={`/snippet/${id}/edit`}
    >
      <MdModeEditOutline size={18} />
    </Link>
  );
}
