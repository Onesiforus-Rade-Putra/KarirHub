import { AtsCvBuilderForm } from '@/components/forms/AtsCvBuilderForm';
import { getCurrentUserOrDemo } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export default async function AtsCvBuilderPage() {
  const user = await getCurrentUserOrDemo();

  const initial = user
    ? await prisma.cV.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
    : null;

  return (
    <main className="container-app py-12">
      <AtsCvBuilderForm initial={null} />
    </main>
  );
}