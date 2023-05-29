import { Author } from '@/components/snippet/author';
import { SnippetCard } from '@/components/snippet/card';

export default function AppHome() {
  return (
    <ul className="space-y-6">
      <li>
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
        <Author
          variant="list"
          userName="loki"
          subText="2 days ago"
          image="https://picsum.photos/id/32/100"
        >
          <p>7 bookmarks</p>
        </Author>
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
  );
}

const code = 'console.log(99);';
