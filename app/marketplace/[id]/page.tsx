import Link from 'next/link';
import { formatRupiah } from '@/lib/format';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } }) || await prisma.service.findFirst();

  if (!service) {
    return <main className="container-app py-12"><p className="text-red-600">Layanan tidak ditemukan.</p></main>;
  }

  return (
    <main className="container-app py-12">
      <div className="grid gap-8 lg:grid-cols-[1.4fr,0.8fr]">
        <section className="card p-8 md:p-10">
          <span className="badge">{service.category}</span>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-primary md:text-4xl">{service.title}</h1>
          <p className="mt-5 text-base leading-8 text-text-soft">{service.description}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-surface-low p-4">
              <p className="text-sm text-text-soft">Provider</p>
              <p className="mt-2 font-bold text-primary">{service.provider}</p>
            </div>
            <div className="rounded-2xl bg-surface-low p-4">
              <p className="text-sm text-text-soft">Rating</p>
              <p className="mt-2 font-bold text-primary">★ {service.rating}</p>
            </div>
            <div className="rounded-2xl bg-surface-low p-4">
              <p className="text-sm text-text-soft">Delivery</p>
              <p className="mt-2 font-bold text-primary">{service.deliveryDays} hari</p>
            </div>
          </div>
          <div className="mt-8 rounded-3xl bg-surface-low p-6">
            <h2 className="text-xl font-bold text-primary">Apa yang didapat?</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-text-soft">
              <li>• Review detail dan perbaikan struktur dokumen karier</li>
              <li>• Feedback yang lebih relevan untuk posisi target</li>
              <li>• Saran revisi yang bisa langsung diterapkan pengguna</li>
            </ul>
          </div>
        </section>

        <aside className="card h-fit p-8">
          <p className="text-sm text-text-soft">Harga layanan</p>
          <p className="mt-3 text-4xl font-black tracking-tight text-primary">{formatRupiah(service.price)}</p>
          <Link href={`/checkout?serviceId=${service.id}`} className="btn-primary mt-6 w-full">Lanjut ke checkout</Link>
        </aside>
      </div>
    </main>
  );
}
