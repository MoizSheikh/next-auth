import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Extract the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log(token);
  // Define the path you want to protect
  const protectedPath = '/';

  // If the user is not authenticated and tries to access the protected path, redirect them to the login page
  if (!token && req.nextUrl.pathname === protectedPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to proceed if the user is authenticated or if the path is not protected
  return NextResponse.next();
} 


