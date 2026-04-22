import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { authCookieName } from '@/lib/auth-config';

export async function getCurrentUser() {
  const userId = cookies().get(authCookieName)?.value;
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId }
  });
}

export async function getCurrentUserOrDemo() {
  const current = await getCurrentUser();
  if (current) return current;

  return prisma.user.findFirst({
    orderBy: { createdAt: 'asc' }
  });
}