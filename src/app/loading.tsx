import { Skeleton } from '@/components/shared/skeleton';

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton variant="list" />
      <Skeleton variant="list" />
    </div>
  );
}
