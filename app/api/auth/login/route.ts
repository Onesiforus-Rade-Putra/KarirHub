import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authCookieName } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!email || !password) {
    return NextResponse.json({ message: 'Email dan password wajib diisi.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return NextResponse.json({ message: 'Email atau password salah.' }, { status: 401 });
  }

  const response = NextResponse.json({
    message: 'Login berhasil.',
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
  response.cookies.set(authCookieName, user.id, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
  return response;
}
