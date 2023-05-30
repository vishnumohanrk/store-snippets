import { PageCenter } from '@/components/shared/page-center';
import { SignIn } from '@/components/shared/sign-in';
import { getCurrentUser } from '@/lib/session';
import type { RCProps } from '@/types';

export default async function Protected({ children }: RCProps) {
  const currentUser = await getCurrentUser();

  return (
    <>
      {currentUser ? (
        children
      ) : (
        <PageCenter>
          <p>Log In to Continue</p>
          <SignIn />
        </PageCenter>
      )}
    </>
  );
}
