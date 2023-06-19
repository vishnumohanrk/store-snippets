import type { User } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    userName: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string;
      userName: string;
    };
  }
}
