import { NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const auth = request.cookies.get('auth');

  if (!auth) {
    // return NextResponse.redirect(new URL('/login', request.url))
  } else {
    //
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/'],
}