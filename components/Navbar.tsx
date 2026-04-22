import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/ai-photo-cv', label: 'AI Photo CV' },
  { href: '/ats-cv-builder', label: 'ATS CV Builder' },
  { href: '/dashboard', label: 'Dashboard' }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-outline/20 bg-background/80 backdrop-blur-xl">
      <div className="container-app flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-primary">
          KarirHub
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-text-soft transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-secondary px-4 py-2">Login</Link>
          <Link href="/register" className="btn-primary px-4 py-2">Daftar</Link>
        </div>
      </div>
    </header>
  );
}
