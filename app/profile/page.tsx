import { ProfileForm } from '@/components/forms/ProfileForm';
import { getCurrentUserOrDemo } from '@/lib/auth';

export default async function ProfilePage() {
  const user = await getCurrentUserOrDemo();
  const initials = user?.name?.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase() || 'KH';
  const profileScore = Math.min(100, 76 + (user?.headline ? 8 : 0) + (user?.about ? 4 : 0));

  return (
    <main className="container-app py-12">
      <div className="grid gap-8 lg:grid-cols-[0.8fr,1.2fr]">
        <aside className="card p-8 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-surface-low text-3xl font-black text-primary">{initials}</div>
          <h1 className="mt-5 text-2xl font-bold text-primary">{user?.name}</h1>
          <p className="mt-2 text-sm text-text-soft">{user?.headline || 'Job Seeker'} • {(user?.role || 'JOB_SEEKER').replace('_', ' ')}</p>
          <div className="mt-6 rounded-2xl bg-surface-low p-4 text-left">
            <p className="text-sm text-text-soft">Profile completion</p>
            <p className="mt-2 text-2xl font-bold text-primary">{profileScore}%</p>
          </div>
        </aside>
        <section className="card p-8 md:p-10">
          <h2 className="text-2xl font-bold text-primary">Edit profil</h2>
          {user ? <ProfileForm user={user} /> : <p className="mt-6 text-sm text-red-600">User tidak ditemukan.</p>}
        </section>
      </div>
    </main>
  );
}
