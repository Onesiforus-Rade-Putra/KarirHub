import { PrismaClient, Role, OrderStatus, PhotoJobStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany();
  await prisma.cV.deleteMany();
  await prisma.photoJob.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();

  const demoUser = await prisma.user.create({
    data: {
      name: 'Onesiforus',
      email: 'demo@karirhub.com',
      password: 'password123',
      phone: '081234567890',
      birthDate: '2002-08-17',
      headline: 'UI/UX Designer',
      location: 'Indonesia',
      about: 'Mahasiswa / fresh graduate yang fokus pada pengembangan karier digital.',
      role: Role.JOB_SEEKER
    }
  });

  await prisma.service.createMany({
    data: [
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
    ]
  });

  const services = await prisma.service.findMany();

  await prisma.order.createMany({
    data: [
      {
        customerName: demoUser.name,
        email: demoUser.email,
        paymentMethod: 'Transfer bank',
        total: 104000,
        platformFee: 5000,
        status: OrderStatus.COMPLETED,
        userId: demoUser.id,
        serviceId: services[0].id,
        notes: 'Mohon fokus pada perbaikan summary dan keyword ATS.'
      },
      {
        customerName: demoUser.name,
        email: demoUser.email,
        paymentMethod: 'E-Wallet',
        total: 154000,
        platformFee: 5000,
        status: OrderStatus.IN_PROGRESS,
        userId: demoUser.id,
        serviceId: services[1].id,
        notes: 'Target untuk posisi Product Designer.'
      }
    ]
  });

  await prisma.cV.create({
    data: {
      fullName: 'Onesiforus',
      targetRole: 'UI/UX Designer',
      summary: 'Fresh graduate dengan minat pada desain produk digital.',
      experience: 'Mengerjakan project redesign aplikasi kampus dan studi kasus dashboard.',
      skills: 'Figma, UX Research, Wireframing, Design Systems',
      aiSummary: 'UI/UX Designer muda dengan pengalaman project akademik dan portofolio yang menunjukkan kemampuan riset, wireframing, dan desain antarmuka yang terstruktur untuk kebutuhan produk digital.',
      aiExperience: 'Memimpin redesign aplikasi kampus, menyusun user flow, wireframe, dan prototype high-fidelity serta melakukan usability testing sederhana untuk meningkatkan kejelasan navigasi.',
      aiSkills: 'Figma, UX Research, Wireframing, Prototype, Design Systems, Usability Testing',
      userId: demoUser.id
    }
  });

  await prisma.photoJob.create({
    data: {
      originalFileName: 'foto-biasa.jpg',
      style: 'Formal Corporate',
      background: 'Background putih',
      ratio: 'Rasio 4:5',
      status: PhotoJobStatus.COMPLETED,
      resultUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
      userId: demoUser.id
    }
  });

  console.log('Database seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
