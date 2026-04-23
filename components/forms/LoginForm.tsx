'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setMessage(data.message || 'Login gagal.');
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <form className="mt-8 space-y-4" onSubmit={onSubmit}>
      <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="flex items-center justify-between text-sm text-text-soft">
        <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Ingat saya</label>
        <button type="button" className="font-semibold text-primary">Lupa password?</button>
      </div>
      {message ? <p className="text-sm text-red-600">{message}</p> : null}
      <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Memproses...' : 'Login'}</button>
    </form>
  );
}
