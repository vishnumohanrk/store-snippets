import Link from 'next/link';

export function OverlayLink({ id }: { id: string }) {
  return (
    <Link
      href={`/snippet/${id}`}
      className="absolute flex h-full w-full items-center justify-center text-lg font-bold opacity-0 backdrop-blur transition hover:underline focus:underline focus:opacity-100 group-hover:opacity-100"
    >
      View Snippet
    </Link>
  );
}
