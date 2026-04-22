import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  _: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const service = await prisma.service.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!service) {
      return NextResponse.json({ message: 'Layanan tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error: any) {
    console.error('GET SERVICE DETAIL ERROR:', error);
    return NextResponse.json(
      { message: error?.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}