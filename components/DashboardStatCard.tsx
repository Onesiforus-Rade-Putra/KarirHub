import { DashboardStat } from '@/lib/types';

export function DashboardStatCard({ stat }: { stat: DashboardStat }) {
  return (
    <div className="card p-6">
      <p className="text-sm text-text-soft">{stat.label}</p>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-primary">{stat.value}</p>
      <p className="mt-2 text-sm text-text-soft">{stat.helper}</p>
    </div>
  );
}
