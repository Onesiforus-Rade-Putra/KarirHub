import { DashboardStat, OrderItem, ServiceItem } from '@/lib/types';
import { formatRupiah } from '@/lib/format';

export const dashboardStats: DashboardStat[] = [
  { label: 'Profile Score', value: '88%', helper: 'Siap melamar ke ATS' },
  { label: 'Applications', value: '12', helper: '3 diproses recruiter' },
  { label: 'AI Assets', value: '24', helper: 'CV + foto profesional' }
];

export const services: ServiceItem[] = [
  {
    id: 'cv-review-premium',
    title: 'ATS CV Review Premium',
    category: 'CV Review',
    price: 99000,
    rating: 4.9,
    provider: 'CareerMentor ID',
    deliveryDays: 2,
    description: 'Review CV berbasis ATS, perbaikan wording, dan saran posisi yang cocok.'
  },
  {
    id: 'interview-coaching-pro',
    title: 'Interview Coaching Pro',
    category: 'Interview Coaching',
    price: 149000,
    rating: 4.8,
    provider: 'HR Insider Studio',
    deliveryDays: 3,
    description: 'Simulasi interview HR dan user interview lengkap dengan feedback.'
  },
  {
    id: 'linkedin-optimization',
    title: 'LinkedIn Optimization',
    category: 'LinkedIn Optimization',
    price: 79000,
    rating: 4.7,
    provider: 'TalentBoost',
    deliveryDays: 2,
    description: 'Optimasi headline, about section, dan keyword agar lebih mudah ditemukan recruiter.'
  },
  {
    id: 'portfolio-review-uiux',
    title: 'Portfolio Review UI/UX',
    category: 'Portfolio Review',
    price: 129000,
    rating: 4.9,
    provider: 'Design Career Lab',
    deliveryDays: 4,
    description: 'Audit portofolio project, struktur case study, dan kesiapan untuk recruiter.'
  }
];

export const orders: OrderItem[] = [
  {
    id: 'ORD-1001',
    serviceTitle: 'ATS CV Review Premium',
    provider: 'CareerMentor ID',
    status: 'Completed',
    total: 99000
  },
  {
    id: 'ORD-1002',
    serviceTitle: 'Interview Coaching Pro',
    provider: 'HR Insider Studio',
    status: 'In Progress',
    total: 149000
  }
];

export { formatRupiah };
