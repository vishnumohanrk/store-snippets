import type { User } from '@prisma/client';

import type { USER_SELECT } from '@/lib/constants';

export type TSnippetVariant = 'full' | 'list';

export type SnippetPageProps = {
  params: { id: string };
};

export type TAuthorDetails = Pick<User, keyof typeof USER_SELECT>;
