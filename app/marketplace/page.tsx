import { SectionHeader } from '@/components/SectionHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { prisma } from '@/lib/prisma';

export default async function MarketplacePage() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="container-app py-12">
      <SectionHeader
        eyebrow="Career marketplace"
        title="Temukan layanan terbaik untuk pengembangan karier"
        subtitle="Halaman marketplace frontend kamu tetap dipakai, tapi daftar layanannya sekarang berasal dari database."
      />
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <input className="input md:col-span-2" placeholder="Cari layanan, mentor, atau kategori" />
        <select className="input" defaultValue="Semua kategori">
          <option>Semua kategori</option>
          <option>CV Review</option>
          <option>Interview Coaching</option>
          <option>LinkedIn Optimization</option>
          <option>Portfolio Review</option>
        </select>
        <select className="input" defaultValue="Urutkan terbaru">
          <option>Urutkan terbaru</option>
          <option>Rating tertinggi</option>
          <option>Harga terendah</option>
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => <ServiceCard key={service.id} service={service} />)}
      </div>
    </main>
  );
}
