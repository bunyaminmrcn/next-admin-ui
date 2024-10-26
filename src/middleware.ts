import { NextRequest, NextResponse } from 'next/server';

// Or like this if you need to do something here.
/* export default auth((req) => {
   console.log(req.auth) //  { session: { user: { ... } } }
}) */

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// src/middleware.ts
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextApiRequest } from 'next';

// ✅ Import the static config - does not use `next-auth`.


export const middleware = (req: NextRequestWithAuth) => {
  if (req.nextUrl.pathname == '/auth/signin') {
    return NextResponse.next()
  } else {
    return withAuth((req), {
      secret: process.env.AUTH_SECRET,
      pages: {
        signIn: '/auth/signup',
      }
    });
  }
}
export default withAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signup',
  },
});

// Or like this if you need to do something here.

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth/signin).*)', '/demo/:path*'],
};