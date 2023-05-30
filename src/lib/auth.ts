import 'server-only';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { db } from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',

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

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.userName = user.userName;
      }
      return session;
    },
  },
};
