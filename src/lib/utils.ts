import 'server-only';

import type { Snippet } from '@prisma/client';

import { highlightCode } from './shiki';

export async function getSnippetFromForm(formData: FormData) {
  const { title, code } = Object.fromEntries(formData);

  if (typeof title !== 'string' || typeof code !== 'string') {
    throw new Error('Bad Input');
  }

  const extension = title.split('.').at(-1) || '';
  const codeHTML = await highlightCode(code, extension);

  return {
    title,
    codeHTML,
    codeText: code,
  } satisfies Pick<Snippet, 'codeHTML' | 'codeText' | 'title'>;
}
