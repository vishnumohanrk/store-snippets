import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & {
      id: DefaultUser['id'];
      userName?: DefaultUser['name'];
    };
  }

  interface User extends DefaultUser {
    userName?: DefaultUser['name'];
  }
}
