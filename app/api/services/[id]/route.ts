import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) {
    return NextResponse.json({ message: 'Layanan tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json(service);
}
