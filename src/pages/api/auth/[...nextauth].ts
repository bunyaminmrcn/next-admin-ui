//@ts-nocheck
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

//const { authCore, authRoot } = useFirebase();
const providers: any[] = [
  
  Credentials({
    name: 'credentials',
    credentials: {
      displayName: { label: 'e-mail', type: 'email', required: true },
      email: { label: 'password', type: 'password', required: true },
      phoneNumber: { label: 'phone', type: 'text', required: false },
      photoURL: { label: 'photoURL', type: 'text', required: false }
    },
    async authorize(credentials: any) {
      //console.log({ credentials })

      if (credentials) {
        return { ...credentials };
      } else {
        return null;
      }
    },
  }),
];

import { createStorage } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';
import { UnstorageAdapter } from '@auth/unstorage-adapter';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { request } from 'http';

const storage = createStorage({
  driver: memoryDriver(),
});
const options = {
  //basePath: "/auth",
  providers,
  adapter: UnstorageAdapter(storage),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
  },
  logger: {
    warn(code) {
      console.warn({ code });
    },
    debug(code, metadata) {
      console.debug({ code, metadata });
    },
  },
  debug: true,
  experimental: {
    enableWebAuthn: true,
  },

  callbacks: {
    authorized(payload: any) {
      const { request, auth } = payload;
      const { pathname } = request.nextUrl;

      console.log(Object.keys(request));
      if (pathname.startsWith('/demo')) {
        
        return !!auth;
      }

      return true;
    },
    session({ session, token }) {
      //console.log({ session, token });
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
}

const authHandler = NextAuth(options)

export default async function handler(...params: any[]) {
  const [req, res] = params
  // Add CORS headers
  return authHandler(...params)
}



export { authHandler as GET,  authHandler as POST, authHandler as auth }