import { getCurrentUserOrDemo } from '@/lib/auth';
import { formatRupiah } from '@/lib/format';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export default async function OrdersPage() {
  const user = await getCurrentUserOrDemo();
  const orders = user ? await prisma.order.findMany({ where: { userId: user.id }, include: { service: true }, orderBy: { createdAt: 'desc' } }) : [];

  return (
    <main className="container-app py-12">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-black tracking-tight text-primary">Pesanan saya</h1>
        <p className="mt-4 text-base leading-8 text-text-soft">Halaman orders kamu masih sama, tapi sekarang datanya sudah dibaca dari database.</p>
      </div>
      <div className="mt-8 grid gap-6">
        {orders.map((order) => (
          <article key={order.id} className="card p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm text-text-soft">{order.id}</p>
                <h2 className="mt-2 text-xl font-bold text-primary">{order.service.title}</h2>
                <p className="mt-2 text-sm text-text-soft">Provider: {order.service.provider}</p>
              </div>
              <div className="text-left md:text-right">
                <span className="badge">{order.status.replace('_', ' ')}</span>
                <p className="mt-3 text-lg font-bold text-primary">{formatRupiah(order.total)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
