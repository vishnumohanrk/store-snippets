import 'server-only';

import type { Highlighter } from 'shiki';
import { getHighlighter, renderToHtml } from 'shiki';

let highlighter: Highlighter;

export async function highlightCode(code: string, extension: string) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      theme: 'github-dark',
    });
  }

  const lang = highlighter.getLoadedLanguages().includes(extension as never)
    ? extension
    : undefined;

  const tokens = highlighter.codeToThemedTokens(code, lang, 'github-dark', {
    includeExplanation: false,
  });

  return renderToHtml(tokens, { bg: 'transparent' });
}
