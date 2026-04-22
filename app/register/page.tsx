import Link from 'next/link';
import { RegisterForm } from '@/components/forms/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="container-app py-16">
      <div className="mx-auto max-w-2xl card p-8 md:p-10">
        <h1 className="text-3xl font-bold text-primary">Buat akun baru</h1>
        <p className="mt-3 text-sm leading-7 text-text-soft">Daftar untuk mulai membuat CV ATS, generate foto formal, dan membeli layanan karier.</p>
        <RegisterForm />
        <p className="mt-6 text-sm text-text-soft">Sudah punya akun? <Link href="/login" className="font-semibold text-primary">Login</Link></p>
      </div>
    </main>
  );
}
