import Link from 'next/link';
import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <main className="container-app py-16">
      <div className="mx-auto max-w-lg card p-8 md:p-10">
        <h1 className="text-3xl font-bold text-primary">Masuk ke KarirHub</h1>
        <p className="mt-3 text-sm leading-7 text-text-soft">Masuk sebagai job seeker untuk mengakses dashboard, AI tools, dan marketplace layanan karier.</p>
        <LoginForm />
        <p className="mt-6 text-sm text-text-soft">Belum punya akun? <Link href="/register" className="font-semibold text-primary">Daftar</Link></p>
        <div className="mt-4 rounded-2xl bg-surface-low p-4 text-sm text-text-soft">
          <p className="font-semibold text-primary">Akun demo</p>
          <p>Email: demo@karirhub.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </main>
  );
}
