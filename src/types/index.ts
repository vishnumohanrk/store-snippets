import type { User } from '@clerk/nextjs/server';

export type RCProps = {
  children: React.ReactNode;
};

export type Never<T> = {
  [K in keyof T]?: never;
};

export type TSnippetVariant = 'full' | 'list';

export type SnippetPageProps = {
  params: { id: string };
};

export type TAuthorDetails = Pick<User, 'imageUrl' | 'id' | 'username'>;
