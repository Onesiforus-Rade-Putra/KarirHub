import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim();
    const password = String(body.password || '').trim();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Email atau password salah.' },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Email atau password salah.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Login berhasil.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server saat login.' },
      { status: 500 }
    );
  }
}