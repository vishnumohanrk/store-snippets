import type { Prisma } from '@prisma/client';

export const USER_SELECT = {
  id: true,
  image: true,
  userName: true,
} satisfies Prisma.UserSelect;

export const FORM_SELECT = {
  title: true,
  codeText: true,
} satisfies Prisma.SnippetSelect;
