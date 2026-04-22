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
      userId: demoUser.id,
      serviceId: 'cv-review-premium',
      paymentMethod: 'Transfer Bank',
      amount: 99000,
      total: 104000,
      platformFee: 5000,
      status: OrderStatus.COMPLETED,
    },
    {
      userId: demoUser.id,
      serviceId: 'ai-photo-pro',
      paymentMethod: 'E-Wallet',
      amount: 79000,
      total: 84000,
      platformFee: 5000,
      status: OrderStatus.IN_PROGRESS,
    }
  ]
});

    await prisma.cV.create({
    data: {
      userId: demoUser.id,
      title: 'Onesiforus - UI/UX Designer',
      fullName: 'Onesiforus',
      targetRole: 'UI/UX Designer',
      education: 'Fresh graduate S1 dengan fokus pada desain produk digital.',
      experience: 'Mengerjakan project redesign aplikasi kampus dan studi kasus dashboard.',
      skills: 'Figma, UX Research, Wireframing, Design Systems',
      projects: 'Redesign dashboard akademik, mobile app case study, landing page design.',
      certifications: 'Google UX Design (opsional)',
      generatedSummary:
        'UI/UX Designer muda dengan pengalaman project akademik dan portofolio yang menunjukkan kemampuan riset, wireframing, dan desain antarmuka yang terstruktur untuk kebutuhan produk digital.',
      generatedSkills: JSON.stringify([
        'Figma',
        'UX Research',
        'Wireframing',
        'Prototype',
        'Design Systems',
        'Usability Testing'
      ]),
      generatedExperience: JSON.stringify([
        'Memimpin redesign aplikasi kampus untuk meningkatkan kejelasan navigasi dan pengalaman pengguna.',
        'Menyusun user flow, wireframe, dan prototype high-fidelity untuk studi kasus dashboard.',
        'Melakukan usability testing sederhana untuk menemukan masalah utama pada antarmuka.'
      ]),
      generatedProjects: JSON.stringify([
        'Redesign aplikasi kampus berbasis riset pengguna.',
        'Membuat studi kasus dashboard dari wireframe hingga prototype.',
        'Merancang landing page modern untuk kebutuhan promosi digital.'
      ]),
      generatedEducation:
        'Lulusan baru dengan fokus pada UI/UX, desain produk digital, dan pendekatan berbasis kebutuhan pengguna.',
      generatedCertifications:
        'Google UX Design (jika ada), pelatihan desain antarmuka dan pengalaman pengguna.',
      generatedTips: JSON.stringify([
        'Gunakan kata kerja aktif pada deskripsi pengalaman.',
        'Tambahkan metrik hasil jika ada.',
        'Sesuaikan skill dengan posisi yang dilamar.'
      ])
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
