'use client';

import { useState } from 'react';

type Props = {
  user: {
    name: string;
    headline: string | null;
    location: string | null;
    about: string | null;
  };
};

export function ProfileForm({ user }: Props) {
  const [form, setForm] = useState({
    name: user.name,
    headline: user.headline || '',
    location: user.location || '',
    about: user.about || ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setLoading(false);
    setMessage(data.message || (res.ok ? 'Profil tersimpan.' : 'Gagal menyimpan profil.'));
  };

  return (
    <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
      <input className="input" placeholder="Nama lengkap" value={form.name} onChange={(e) => update('name', e.target.value)} />
      <input className="input" placeholder="Headline" value={form.headline} onChange={(e) => update('headline', e.target.value)} />
      <input className="input md:col-span-2" placeholder="Lokasi" value={form.location} onChange={(e) => update('location', e.target.value)} />
      <textarea className="input min-h-32 md:col-span-2" placeholder="Tentang saya" value={form.about} onChange={(e) => update('about', e.target.value)} />
      {message ? <p className="text-sm text-primary md:col-span-2">{message}</p> : null}
      <button className="btn-primary md:col-span-2" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan perubahan'}</button>
    </form>
  );
}
