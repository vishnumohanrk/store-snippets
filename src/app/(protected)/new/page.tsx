import { SnippetForm } from '@/components/snippet/form';

async function action(formData: FormData) {
  'use server';
  console.log(formData);
}

export default function CreateNewSnippet() {
  return <SnippetForm action={action} type="create" />;
}
