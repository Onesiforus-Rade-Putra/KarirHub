import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { getCurrentUserOrDemo } from '@/lib/auth';
import { formatRupiah } from '@/lib/format';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export default async function CheckoutPage({ searchParams }: { searchParams?: { serviceId?: string } }) {
  const user = await getCurrentUserOrDemo();
  const selectedId = searchParams?.serviceId;
  const service = await prisma.service.findUnique({ where: { id: selectedId || 'cv-review-premium' } })
    || await prisma.service.findFirst();

  if (!service) {
    return <main className="container-app py-12"><p className="text-red-600">Layanan tidak ditemukan.</p></main>;
  }

  const fee = 5000;
  const total = service.price + fee;

  return (
    <main className="container-app py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr,0.9fr]">
        <section className="card p-8 md:p-10">
          <h1 className="text-3xl font-black tracking-tight text-primary">Checkout layanan</h1>
          <p className="mt-4 text-base leading-8 text-text-soft">Frontend checkout kamu tetap dipakai, tapi sekarang tombol bayar sudah membuat order ke backend dan masuk ke database.</p>
          <CheckoutForm service={service} defaultName={user?.name || ''} defaultEmail={user?.email || ''} />
        </section>

        <aside className="card h-fit p-8">
          <h2 className="text-xl font-bold text-primary">Ringkasan pesanan</h2>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-text-soft">Layanan</span>
              <span className="max-w-[220px] text-right font-semibold text-text-main">{service.title}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-text-soft">Harga</span>
              <span>{formatRupiah(service.price)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-text-soft">Biaya platform</span>
              <span>{formatRupiah(fee)}</span>
            </div>
            <div className="border-t border-outline/20 pt-4 text-base font-bold text-primary flex items-center justify-between gap-4">
              <span>Total</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
