import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authCookieName } from '@/lib/auth-config';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  const phone = String(body.phone || '').trim();
  const birthDate = String(body.birthDate || '').trim();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: 'Nama, email, dan password wajib diisi.' },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return NextResponse.json(
      { message: 'Email sudah terdaftar.' },
      { status: 409 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      phone: phone || null,
      birthDate: birthDate || null,
      headline: 'Job Seeker',
      location: 'Indonesia',
      about: 'Pengguna baru KarirHub.',
    },
  });

  const response = NextResponse.json({
    message: 'Registrasi berhasil.',
    user,
  });

  response.cookies.set(authCookieName, user.id, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}