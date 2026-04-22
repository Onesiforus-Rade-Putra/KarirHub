'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', birthDate: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setMessage(data.message || 'Registrasi gagal.');
    router.push('/choose-role');
    router.refresh();
  };

  return (
    <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
      <input className="input" placeholder="Nama lengkap" value={form.name} onChange={(e) => update('name', e.target.value)} />
      <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
      <input className="input" placeholder="Nomor telepon" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
      <input className="input" type="date" placeholder="Tanggal lahir" value={form.birthDate} onChange={(e) => update('birthDate', e.target.value)} />
      <input className="input md:col-span-2" type="password" placeholder="Password" value={form.password} onChange={(e) => update('password', e.target.value)} />
      {message ? <p className="text-sm text-red-600 md:col-span-2">{message}</p> : null}
      <button type="submit" className="btn-primary md:col-span-2" disabled={loading}>{loading ? 'Membuat akun...' : 'Daftar akun'}</button>
    </form>
  );
}
