import type { Never } from '@/types';

import { ButtonGroup } from '../shared/button-group';
import { FormButton } from '../shared/form-button';
import { FormInput } from './form-input';

type TFormVariant = 'create' | 'update';

type ReqProps = {
  defaultTitle: string;
  defaultContent: string;
};

type Props<T extends TFormVariant> = {
  type: T;
  action: React.ComponentProps<'form'>['action'];
} & (T extends 'update' ? ReqProps : Never<ReqProps>);

export function SnippetForm<T extends TFormVariant>({
  type,
  action,
  defaultTitle,
  defaultContent,
}: Props<T>) {
  return (
    <form className="flex min-h-[--ht] flex-col" action={action}>
      <FormInput
        name="title"
        variant="input"
        defaultValue={defaultTitle}
        placeholder="Enter File Name with extension"
        className="h-12 w-full rounded-t-md border border-b-0 bg-neutral-900 px-4"
      />
      <FormInput
        name="code"
        variant="textarea"
        placeholder="Code"
        defaultValue={defaultContent}
        className="flex-1 resize-none rounded-b-md border bg-transparent p-4"
      />
      <ButtonGroup className="mt-4">
        {type === 'create' && (
          <FormButton variant="secondary" name="private">
            Create Private Snippet
          </FormButton>
        )}
        <FormButton variant="primary" name="public">
          {type === 'create' ? 'Create Public' : 'Update'} Snippet
        </FormButton>
      </ButtonGroup>
    </form>
  );
}
