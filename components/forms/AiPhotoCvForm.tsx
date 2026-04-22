'use client';

import Image from 'next/image';
import { useState } from 'react';

type Job = {
  style: string;
  background: string;
  ratio: string;
  resultUrl: string | null;
};

export function AiPhotoCvForm({ initial }: { initial?: Job | null }) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [style, setStyle] = useState(initial?.style || 'Formal Corporate');
  const [background, setBackground] = useState(initial?.background || 'Background putih');
  const [ratio, setRatio] = useState(initial?.ratio || 'Rasio 4:5');
  const [result, setResult] = useState<Job | null>(initial || null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage('Pilih foto dulu.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('style', style);
    formData.append('background', background);
    formData.append('ratio', ratio);

    const res = await fetch('/api/photo-jobs', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.message || 'Gagal generate foto.');
      return;
    }

    setMessage(data.message || 'Berhasil generate foto.');
    setResult(data.job);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
      <section className="card p-8 md:p-10">
        <span className="badge">AI Photo CV</span>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-primary md:text-4xl">
          Ubah foto biasa jadi foto CV formal
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-text-soft">
          Sekarang generate foto akan mengirim selfie asli ke backend lalu diproses AI.
        </p>

        <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files?.[0] || null;
              setFile(selected);
              setFileName(selected?.name || '');
            }}
          />

          <select className="input" value={style} onChange={(e) => setStyle(e.target.value)}>
            <option>Formal Corporate</option>
            <option>Minimalist Professional</option>
            <option>Executive Look</option>
          </select>

          <select className="input" value={background} onChange={(e) => setBackground(e.target.value)}>
            <option>Background putih</option>
            <option>Background abu netral</option>
            <option>Background studio biru</option>
          </select>

          <select className="input" value={ratio} onChange={(e) => setRatio(e.target.value)}>
            <option>Rasio 4:5</option>
            <option>Rasio 1:1</option>
          </select>

          {fileName ? <p className="text-sm text-text-soft md:col-span-2">File: {fileName}</p> : null}
          {message ? <p className="text-sm text-primary md:col-span-2">{message}</p> : null}

          <button className="btn-primary mt-2 md:col-span-2" disabled={loading}>
            {loading ? 'Generating...' : 'Generate foto formal'}
          </button>
        </form>
      </section>

      <aside className="card p-8 md:p-10">
        <h2 className="text-2xl font-bold text-primary">Preview hasil</h2>

        <div className="mt-6 overflow-hidden rounded-[2rem] bg-surface-low">
          {result?.resultUrl ? (
            <div className="relative aspect-[4/5] w-full">
              <Image src={result.resultUrl} alt="Preview AI Photo CV" fill className="object-cover" />
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center text-center text-sm text-text-soft">
              Preview AI photo akan muncul di sini
            </div>
          )}
        </div>

        {result?.resultUrl ? (
          <a
            href={result.resultUrl}
            download="cv-photo.jpg"
            className="btn-primary mt-6 flex w-full items-center justify-center"
          >
            Download foto
          </a>
        ) : null}

        <div className="mt-6 grid gap-3">
          <button type="button" className="btn-secondary">Gunakan untuk profil</button>
          <button type="button" className="btn-secondary">Gunakan untuk CV</button>
        </div>
      </aside>
    </div>
  );
}