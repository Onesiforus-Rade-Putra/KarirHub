import Link from 'next/link';
import { ServiceItem } from '@/lib/types';
import { formatRupiah } from '@/data/mock';

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="card p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="badge">{service.category}</span>
        <span className="text-sm font-semibold text-secondary">★ {service.rating}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-primary">{service.title}</h3>
      <p className="mt-2 text-sm leading-6 text-text-soft">{service.description}</p>
      <div className="mt-5 space-y-1 text-sm text-text-soft">
        <p>Penyedia: <span className="font-semibold text-text-main">{service.provider}</span></p>
        <p>Estimasi: {service.deliveryDays} hari</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-lg font-bold text-primary">{formatRupiah(service.price)}</p>
        <Link href={`/marketplace/${service.id}`} className="btn-primary px-4 py-2">
          Lihat detail
        </Link>
      </div>
    </article>
  );
}
