import Link from 'next/link';
import { DashboardStatCard } from '@/components/DashboardStatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { getCurrentUserOrDemo } from '@/lib/auth';
import { getDashboardData } from '@/lib/dashboard';

export default async function DashboardPage() {
  const user = await getCurrentUserOrDemo();
  const data = user ? await getDashboardData(user.id) : { stats: [], latestOrders: [] };

  return (
    <main className="container-app py-12">
      <section className="card bg-brand p-8 text-white md:p-10">
        <p className="text-sm text-white/80">Halo, {user?.name || 'Job Seeker'}</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Siap naik level untuk karier berikutnya?</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">Gunakan AI tools, rapikan profile, dan beli layanan expert untuk meningkatkan peluang lolos screening recruiter.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/ats-cv-builder" className="btn-secondary bg-white text-primary hover:bg-white/90">Buat CV ATS</Link>
          <Link href="/ai-photo-cv" className="btn-secondary bg-white/10 text-white hover:bg-white/20">Generate foto formal</Link>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {data.stats.map((stat) => <DashboardStatCard key={stat.label} stat={stat} />)}
      </section>

      <section className="mt-14">
        <SectionHeader
          eyebrow="Quick actions"
          title="Aksi yang paling sering dipakai"
          subtitle="Bagian ini tetap pakai flow frontend kamu, cuma sekarang data ringkasannya datang dari backend."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['/ats-cv-builder', 'ATS CV Builder', 'Susun CV terstruktur dan siap export.'],
            ['/ai-photo-cv', 'AI Photo CV', 'Ubah foto biasa jadi formal profesional.'],
            ['/marketplace', 'Marketplace', 'Cari mentor, coach, dan reviewer CV.'],
            ['/orders', 'Pesanan Saya', 'Pantau progres setiap layanan yang dibeli.']
          ].map(([href, title, desc]) => (
            <Link key={title} href={href} className="card block p-6 transition hover:-translate-y-1">
              <h3 className="text-lg font-bold text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-soft">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeader
          eyebrow="Order summary"
          title="Pesanan terbaru"
          subtitle="Sekarang tabel ini membaca order asli dari database starter kamu."
        />
        <div className="card overflow-x-auto p-4">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-text-soft">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Layanan</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.latestOrders.map((order) => (
                <tr key={order.id} className="border-t border-outline/20">
                  <td className="px-4 py-4 font-semibold text-primary">{order.id}</td>
                  <td className="px-4 py-4">{order.service.title}</td>
                  <td className="px-4 py-4">{order.service.provider}</td>
                  <td className="px-4 py-4">{order.status.replace('_', ' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
