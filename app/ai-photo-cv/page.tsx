import { AiPhotoCvForm } from '@/components/forms/AiPhotoCvForm';
import { getCurrentUserOrDemo } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export default async function AiPhotoCvPage() {
  const user = await getCurrentUserOrDemo();
  const initial = user ? await prisma.photoJob.findFirst({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } }) : null;

  return (
    <main className="container-app py-12">
      <AiPhotoCvForm initial={initial ? {
        style: initial.style,
        background: initial.background,
        ratio: initial.ratio,
        resultUrl: initial.resultUrl
      } : null} />
    </main>
  );
}
