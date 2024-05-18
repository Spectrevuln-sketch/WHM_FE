'use server';
import { apiRequest } from '@/config/api';
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get('token');
  if (!token) {
    // return NextResponse.redirect(new URL('/login', request.url))
  } else {
    //
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/'],
}