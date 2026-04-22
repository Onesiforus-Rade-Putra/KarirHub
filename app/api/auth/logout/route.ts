import { NextResponse } from 'next/server';
import { authCookieName } from '@/lib/auth-config';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout berhasil.' });

  response.cookies.set(authCookieName, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax'
  });

  return response;
}