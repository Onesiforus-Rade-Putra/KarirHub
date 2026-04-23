'use client';
import { useState } from 'react';

const emptyForm = {
  fullName: '',
  targetRole: '',
  education: '',
  experience: '',
  skills: '',
  projects: '',
  certifications: ''
};

type AtsResult = {
  fullName?: string;
  targetRole?: string;
  professional_summary: string;
  skills: string[];
  experience_bullets: string[];
  project_bullets: string[];
  education_section: string;
  certification_section: string;
  ats_tips: string[];
};

type InitialCV = {
  fullName: string;
  targetRole: string;
  education: string;
  experience: string;
  skills: string;
  projects: string;
  certifications: string;
  generatedSummary: string;
  generatedSkills: string;
  generatedExperience: string;
  generatedProjects: string;
  generatedEducation: string;
  generatedCertifications: string;
  generatedTips: string;
};

export function AtsCvBuilderForm({ initial }: { initial?: InitialCV | null }) {
  const [form, setForm] = useState({
  ...emptyForm,
  fullName: initial?.fullName || '',
  targetRole: initial?.targetRole || '',
  education: initial?.education || '',
  experience: initial?.experience || '',
  skills: initial?.skills || '',
  projects: initial?.projects || '',
  certifications: initial?.certifications || ''
  });

  const [result, setResult] = useState<AtsResult | null>(
  initial
    ? {
        fullName: initial.fullName || '',
        targetRole: initial.targetRole || '',
        professional_summary: initial.generatedSummary || '',
        skills: initial.generatedSkills ? JSON.parse(initial.generatedSkills) : [],
        experience_bullets: initial.generatedExperience ? JSON.parse(initial.generatedExperience) : [],
        project_bullets: initial.generatedProjects ? JSON.parse(initial.generatedProjects) : [],
        education_section: initial.generatedEducation || '',
        certification_section: initial.generatedCertifications || '',
        ats_tips: initial.generatedTips ? JSON.parse(initial.generatedTips) : []
      }
    : null
  );

  const handleExportPdf = () => {
  window.print(); // atau logic export pdf kamu nanti
  setForm(emptyForm);
  setMessage('');
  setResult(null);
};

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setResult(null);

    const res = await fetch('/api/cv/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.message || 'Gagal generate CV.');
      return;
    }

    setMessage(data.message || 'CV ATS berhasil digenerate.');
    setResult({
    ...data.result,
    fullName: form.fullName,
    targetRole: form.targetRole
    });
    setForm(emptyForm);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,0.9fr]">
      <section className="card p-8 md:p-10">
        <span className="badge">ATS CV Builder</span>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-primary md:text-4xl">
          Buat CV yang lebih rapi dan ramah ATS
        </h1>
        <p className="mt-5 text-base leading-8 text-text-soft">
          Sekarang ATS CV Builder sudah memakai Gemini untuk membuat draft CV ATS-friendly secara real.
        </p>

        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <input
            className="input"
            placeholder="Nama lengkap"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
          />

          <input
            className="input"
            placeholder="Posisi target"
            value={form.targetRole}
            onChange={(e) => update('targetRole', e.target.value)}
          />

          <textarea
            className="input min-h-28"
            placeholder="Pendidikan"
            value={form.education}
            onChange={(e) => update('education', e.target.value)}
          />

          <textarea
            className="input min-h-32"
            placeholder="Pengalaman kerja / organisasi / magang"
            value={form.experience}
            onChange={(e) => update('experience', e.target.value)}
          />

          <textarea
            className="input min-h-24"
            placeholder="Skill utama, pisahkan dengan koma"
            value={form.skills}
            onChange={(e) => update('skills', e.target.value)}
          />

          <textarea
            className="input min-h-24"
            placeholder="Project / portofolio"
            value={form.projects}
            onChange={(e) => update('projects', e.target.value)}
          />

          <textarea
            className="input min-h-24"
            placeholder="Sertifikasi"
            value={form.certifications}
            onChange={(e) => update('certifications', e.target.value)}
          />

          {message ? <p className="text-sm text-primary">{message}</p> : null}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Generating...' : 'Generate CV ATS'}
          </button>
        </form>
      </section>

      <aside className="card p-8 md:p-10">
        <h2 className="text-2xl font-bold text-primary">Preview CV</h2>

        <div className="mt-6 min-h-[520px] rounded-[2rem] border border-outline/30 bg-white p-6 text-sm text-text-soft">
          {!result ? (
            <p>Preview hasil AI akan muncul di sini.</p>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="font-bold text-primary">{result.fullName || 'Nama Lengkap'}</p>
                <p className="mt-2">{result.targetRole || 'Posisi target'}</p>
              </div>

              <div>
                <p className="font-semibold text-text-main">Professional Summary</p>
                <p className="mt-2 leading-7">{result.professional_summary}</p>
              </div>

              <div>
                <p className="font-semibold text-text-main">Skills</p>
                <ul className="mt-2 list-disc pl-5">
                  {result.skills.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-text-main">Experience</p>
                <ul className="mt-2 list-disc pl-5">
                  {result.experience_bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-text-main">Projects</p>
                <ul className="mt-2 list-disc pl-5">
                  {result.project_bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-text-main">Education</p>
                <p className="mt-2 leading-7">{result.education_section}</p>
              </div>

              <div>
                <p className="font-semibold text-text-main">Certifications</p>
                <p className="mt-2 leading-7">{result.certification_section}</p>
              </div>

              <div>
                <p className="font-semibold text-text-main">ATS Tips</p>
                <ul className="mt-2 list-disc pl-5">
                  {result.ats_tips.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <button
  type="button"
  className="btn-secondary mt-6 w-full"
  onClick={handleExportPdf}
>
  Export PDF
</button>
      </aside>
    </div>
  );
}