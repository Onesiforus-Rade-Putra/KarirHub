export type Role = 'job-seeker' | 'seller';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  provider: string;
  deliveryDays: number;
  description: string;
}

export interface OrderItem {
  id: string;
  serviceTitle: string;
  provider: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  total: number;
}

export interface DashboardStat {
  label: string;
  value: string;
  helper: string;
}
