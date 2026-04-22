import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() || '';
    const category = searchParams.get('category')?.trim() || '';
    const sort = searchParams.get('sort')?.trim() || 'latest';

    const orderBy =
      sort === 'rating'
        ? { rating: 'desc' as const }
        : sort === 'price'
          ? { price: 'asc' as const }
          : { createdAt: 'desc' as const };

    const services = await prisma.service.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { title: { contains: q, mode: 'insensitive' } },
                  { description: { contains: q, mode: 'insensitive' } },
                  { provider: { contains: q, mode: 'insensitive' } },
                  { category: { contains: q, mode: 'insensitive' } }
                ]
              }
            : {},
          category && category !== 'Semua kategori' ? { category } : {}
        ]
      },
      orderBy
    });

    return NextResponse.json(services);
  } catch (error: any) {
    console.error('GET SERVICES ERROR:', error);
    return NextResponse.json(
      { message: error?.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}