import { Author } from '@/components/snippet/author';
import { BookmarkButton } from '@/components/snippet/bookmark-button';
import { SnippetCard } from '@/components/snippet/card';
import { EditLink } from '@/components/snippet/edit-link';

export default function SnippetPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      <Author
        variant="full"
        userName="loki"
        subText="2 days ago"
        image="https://picsum.photos/id/32/100"
      >
        <p className="text-neutral-400">7 Bookmarks</p>
      </Author>
      <SnippetCard
        id={id}
        isPrivate
        variant="full"
        codeHTML={code}
        codeText={code}
        title="layout.tsx"
      >
        <EditLink id={id} />
        <BookmarkButton isBookmarked />
      </SnippetCard>
    </>
  );
}

const code = 'console.log(99);';
