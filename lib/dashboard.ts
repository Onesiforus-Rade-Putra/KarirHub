import { prisma } from '@/lib/prisma';

export async function getDashboardData(userId: string) {
  const [orderCount, inProgressCount, cvCount, photoCount, latestOrders] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.order.count({ where: { userId, status: 'IN_PROGRESS' } }),
    prisma.cV.count({ where: { userId } }),
    prisma.photoJob.count({ where: { userId } }),
    prisma.order.findMany({
      where: { userId },
      include: { service: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ]);

  const profileScore = Math.min(100, 60 + cvCount * 10 + photoCount * 10 + orderCount * 5);

  return {
    stats: [
      { label: 'Profile Score', value: `${profileScore}%`, helper: 'Naik saat CV, foto, dan profil lengkap' },
      { label: 'Applications Support', value: `${orderCount}`, helper: `${inProgressCount} layanan sedang dikerjakan` },
      { label: 'AI Assets', value: `${cvCount + photoCount}`, helper: `${cvCount} CV + ${photoCount} foto formal` }
    ],
    latestOrders
  };
}
