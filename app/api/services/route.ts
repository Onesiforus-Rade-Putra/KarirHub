import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
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
                { title: { contains: q } },
                { description: { contains: q } },
                { provider: { contains: q } },
                { category: { contains: q } }
              ]
            }
          : {},
        category && category !== 'Semua kategori' ? { category } : {}
      ]
    },
    orderBy
  });

  return NextResponse.json(services);
}
