import Link from 'next/link';
import { SectionHeader } from '@/components/SectionHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const services = await prisma.service.findMany({ take: 4, orderBy: { createdAt: 'desc' } });

  return (
    <main>
      <section className="overflow-hidden py-20 lg:py-28">
        <div className="container-app grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="badge">Career platform + AI tools</span>
            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-primary md:text-6xl">
              Bangun kariermu lebih cepat dengan AI, marketplace, dan layanan profesional.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-text-soft md:text-lg">
              KarirHub membantu job seeker membuat CV ATS, foto CV formal, membeli layanan pengembangan karier,
              dan memantau progres mereka dalam satu platform web.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register" className="btn-primary">Mulai sekarang</Link>
              <Link href="/marketplace" className="btn-secondary">Lihat marketplace</Link>
            </div>
          </div>
          <div className="card rounded-[2rem] bg-brand p-8 text-white">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-white/80">AI Photo CV</p>
                <p className="mt-2 text-2xl font-bold">50+ gaya formal</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-white/80">ATS CV Builder</p>
                <p className="mt-2 text-2xl font-bold">Siap export PDF</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur md:col-span-2">
                <p className="text-sm text-white/80">Career Marketplace</p>
                <p className="mt-2 text-2xl font-bold">CV review, coaching, LinkedIn, portfolio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-low py-20">
        <div className="container-app">
          <SectionHeader
            eyebrow="Fitur utama"
            title="Fokus ke alur yang benar-benar dipakai job seeker"
            subtitle="Tampilan frontend kamu tetap sama, tapi sekarang bisa ditopang backend untuk auth, order, CV, photo job, dan profile."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Auth & Role', 'Login, register, dan choose role untuk alur awal pengguna.'],
              ['Dashboard', 'Ringkasan profile score, order, AI assets, dan quick actions.'],
              ['AI Tools', 'Generate foto formal dan susun CV ATS dengan backend starter.'],
              ['Marketplace', 'Beli layanan pengembangan karier dan checkout.']
            ].map(([title, desc]) => (
              <div key={title} className="card p-6">
                <h3 className="text-lg font-bold text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-soft">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-app">
          <SectionHeader
            eyebrow="Marketplace preview"
            title="Contoh layanan yang sudah masuk database"
            subtitle="Ini bukan project baru dari nol. Ini starter frontend kamu yang sama, cuma sudah aku tambahkan backend dan database."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
