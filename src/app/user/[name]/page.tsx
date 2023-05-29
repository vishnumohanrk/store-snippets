import { Author } from '@/components/snippet/author';
import { SnippetCard } from '@/components/snippet/card';

export default function UserPage() {
  return (
    <>
      <Author
        userName="Lorem"
        variant="userPage"
        subText="Lorem Ipsum"
        image="https://picsum.photos/id/32/100"
      >
        <p>7 Snippets</p>
      </Author>
      <ul className="space-y-7">
        <li>
          <SnippetCard
            id="123"
            isPrivate
            variant="list"
            codeHTML={code}
            codeText={code}
            title="layout.tsx"
          />
        </li>
        <li>
          <SnippetCard
            id="123"
            isPrivate
            variant="list"
            codeHTML={code}
            codeText={code}
            title="layout.tsx"
          />
        </li>
        <li>
          <SnippetCard
            id="123"
            isPrivate
            variant="list"
            codeHTML={code}
            codeText={code}
            title="layout.tsx"
          />
        </li>
        <li>
          <SnippetCard
            id="123"
            isPrivate
            variant="list"
            codeHTML={code}
            codeText={code}
            title="layout.tsx"
          />
        </li>
      </ul>
    </>
  );
}

const code = 'console.log(99);';
