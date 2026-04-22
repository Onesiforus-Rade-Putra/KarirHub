import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const COOKIE_NAME = 'karirhub_user_id';

export async function getCurrentUser() {
  const userId = cookies().get(COOKIE_NAME)?.value;
  if (!userId) return null;
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function getCurrentUserOrDemo() {
  const current = await getCurrentUser();
  if (current) return current;
  return prisma.user.findFirst({ orderBy: { createdAt: 'asc' } });
}

export const authCookieName = COOKIE_NAME;
