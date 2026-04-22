import Link from 'next/link';

export default function ChooseRolePage() {
  return (
    <main className="container-app py-16">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-black tracking-tight text-primary">Pilih peranmu di KarirHub</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-text-soft">Struktur frontend kamu tetap dipakai. Untuk sekarang backend starter difokuskan dulu ke alur utama job seeker, sedangkan seller bisa kamu tambah berikutnya.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card p-8">
          <span className="badge">Role utama</span>
          <h2 className="mt-4 text-2xl font-bold text-primary">Job Seeker</h2>
          <p className="mt-4 text-sm leading-7 text-text-soft">Buat CV ATS, generate foto formal, beli layanan karier, dan lacak pesanan.</p>
          <Link href="/dashboard" className="btn-primary mt-8">Lanjut sebagai Job Seeker</Link>
        </div>
        <div className="card p-8">
          <span className="badge">Pengembangan berikutnya</span>
          <h2 className="mt-4 text-2xl font-bold text-primary">Seller / Career Expert</h2>
          <p className="mt-4 text-sm leading-7 text-text-soft">Kelola jasa, terima order, atur portofolio, dan pantau pendapatan.</p>
          <button className="btn-secondary mt-8" type="button">Siapkan modul seller</button>
        </div>
      </div>
    </main>
  );
}
