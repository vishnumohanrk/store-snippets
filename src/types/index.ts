export type RCProps = {
  children: React.ReactNode;
};

export type Never<T> = {
  [K in keyof T]?: never;
};

export type TSnippetVariant = 'full' | 'list';
