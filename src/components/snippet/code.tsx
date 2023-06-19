import type { Snippet } from '@prisma/client';
import { Code } from 'bright';

Code.theme = 'github-dark';

type Props = Pick<Snippet, 'title' | 'codeText'>;

export function SnippetCode({ codeText, title }: Props) {
  const lang = title.split('.').at(-1);

  return (
    <Code className="!m-0" lang={lang}>
      {codeText}
    </Code>
  );
}
