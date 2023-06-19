import { ButtonGroup } from '../shared/button-group';
import { FormButton } from '../shared/form-button';
import { FormInput } from './form-input';

type ReqProps = {
  defaultTitle: string;
  defaultContent: string;
};

type Props = { action: React.ComponentProps<'form'>['action'] } & (
  | ({ type: 'create' } & Partial<ReqProps>)
  | ({ type: 'update' } & ReqProps)
);

export function SnippetForm({
  type,
  action,
  defaultTitle,
  defaultContent,
}: Props) {
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
        className="grow resize-none rounded-b-md border bg-transparent p-4"
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
