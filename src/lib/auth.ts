import 'server-only';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { db } from './db';

if (
  !process.env.NEXTAUTH_SECRET ||
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET
) {
  throw new Error('Missing Auth env vars');
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      profile(profile) {
        return {
          email: profile.email,
          userName: profile.login,
          id: profile.id.toString(),
          image: profile.avatar_url,
          name: profile.name ?? profile.login,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userName = (user as any).userName;
      }

      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.userName = token.userName;
      }

      return session;
    },
  },

  theme: {
    colorScheme: 'dark',
  },
};
