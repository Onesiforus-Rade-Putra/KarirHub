'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Service = {
  id: string;
  title: string;
  price: number;
};

export function CheckoutForm({ service, defaultName, defaultEmail }: { service: Service; defaultName: string; defaultEmail: string }) {
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: defaultName,
    email: defaultEmail,
    notes: '',
    paymentMethod: 'Transfer bank'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, serviceId: service.id })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setMessage(data.message || 'Checkout gagal.');
    router.push('/orders');
    router.refresh();
  };

  return (
    <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
      <input className="input" placeholder="Nama pemesan" value={form.customerName} onChange={(e) => update('customerName', e.target.value)} />
      <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
      <textarea className="input min-h-32" placeholder="Catatan untuk penyedia layanan" value={form.notes} onChange={(e) => update('notes', e.target.value)} />
      <select className="input" value={form.paymentMethod} onChange={(e) => update('paymentMethod', e.target.value)}>
        <option>Transfer bank</option>
        <option>E-Wallet</option>
        <option>Virtual account</option>
      </select>
      {message ? <p className="text-sm text-red-600">{message}</p> : null}
      <button className="btn-primary" disabled={loading}>{loading ? 'Memproses...' : 'Bayar sekarang'}</button>
    </form>
  );
}
