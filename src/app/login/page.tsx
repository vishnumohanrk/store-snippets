import { IoLogoGithub } from 'react-icons/io5';

import { PageCenter } from '@/components/shared/page-center';
import { SignIn } from '@/components/shared/sign-in';

export default async function SignInPage() {
  return (
    <PageCenter>
      <SignIn>
        <IoLogoGithub size={24} />
        Sign in with GitHub
      </SignIn>
    </PageCenter>
  );
}
