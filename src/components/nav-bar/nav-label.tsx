type Props = {
  text: string;
  authed?: boolean;
};

export function NavLabel({ text, authed = true }: Props) {
  return <span className={authed ? 'max-md:sr-only' : ''}>{text}</span>;
}
