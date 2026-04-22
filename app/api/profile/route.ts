import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserOrDemo } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const user = await getCurrentUserOrDemo();
    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    console.error('GET PROFILE ERROR:', error);
    return NextResponse.json(
      { message: error?.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUserOrDemo();
    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
    }

    const body = await request.json();
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: String(body.name || '').trim() || user.name,
        headline: String(body.headline || '').trim() || null,
        location: String(body.location || '').trim() || null,
        about: String(body.about || '').trim() || null
      }
    });

    return NextResponse.json({ message: 'Profil berhasil diperbarui.', user: updated });
  } catch (error: any) {
    console.error('PUT PROFILE ERROR:', error);
    return NextResponse.json(
      { message: error?.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}