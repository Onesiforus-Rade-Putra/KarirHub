import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserOrDemo } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUserOrDemo();
  if (!user) return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const user = await getCurrentUserOrDemo();
  if (!user) return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });

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
}
