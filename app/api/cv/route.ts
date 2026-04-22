import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserOrDemo } from '@/lib/auth';

function enhanceSummary(text: string, role: string) {
  return `${role} dengan profil yang lebih terstruktur, menonjolkan dampak kerja, kemampuan kolaborasi, dan kata kunci yang relevan untuk proses screening ATS.` + (text ? ` Fokus utama: ${text}` : '');
}

function enhanceExperience(text: string) {
  return `Menyusun pengalaman dalam format yang berorientasi hasil, menjelaskan proyek, tanggung jawab utama, dan dampak yang diberikan pada pengguna atau bisnis. ${text}`;
}

function enhanceSkills(text: string) {
  return `${text.split(',').map((item) => item.trim()).filter(Boolean).join(', ')}, Communication, Problem Solving, Collaboration`;
}

export async function GET() {
  const user = await getCurrentUserOrDemo();
  if (!user) return NextResponse.json([]);
  const cvs = await prisma.cV.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(cvs);
}

export async function POST(request: Request) {
  const user = await getCurrentUserOrDemo();
  if (!user) return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
  const body = await request.json();
  const fullName = String(body.fullName || '').trim();
  const targetRole = String(body.targetRole || '').trim();
  const summary = String(body.summary || '').trim();
  const experience = String(body.experience || '').trim();
  const skills = String(body.skills || '').trim();

  if (!fullName || !targetRole) {
    return NextResponse.json({ message: 'Nama lengkap dan posisi target wajib diisi.' }, { status: 400 });
  }

  const cv = await prisma.cV.create({
    data: {
      fullName,
      targetRole,
      summary,
      experience,
      skills,
      aiSummary: enhanceSummary(summary, targetRole),
      aiExperience: enhanceExperience(experience),
      aiSkills: enhanceSkills(skills),
      userId: user.id
    }
  });

  return NextResponse.json({ message: 'CV ATS berhasil dibuat.', cv }, { status: 201 });
}
