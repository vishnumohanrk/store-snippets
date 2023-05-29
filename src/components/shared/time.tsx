import 'server-only';

import { formatDistanceToNowStrict } from 'date-fns';

export function Time({ date }: { date: Date }) {
  return (
    <time dateTime={date.toISOString()} title={date.toUTCString()}>
      {formatDistanceToNowStrict(date, { addSuffix: true })}
    </time>
  );
}
