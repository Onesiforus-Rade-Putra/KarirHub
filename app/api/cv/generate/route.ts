import { NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';
import { prisma } from '@/lib/prisma';
import { getCurrentUserOrDemo } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function cleanJson(text: string) {
  return text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();
}

export async function POST(req: Request) {
  try {
    const gemini = getGeminiClient();

    const user = await getCurrentUserOrDemo();
    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 401 });
    }

    const body = await req.json();
    const {
      fullName,
      targetRole,
      education,
      experience,
      skills,
      projects,
      certifications
    } = body;

    if (!fullName || !targetRole) {
      return NextResponse.json(
        { message: 'Nama lengkap dan target role wajib diisi.' },
        { status: 400 }
      );
    }

    const prompt = `
Kamu adalah AI career assistant dan ATS CV writer profesional.

Tugas:
Buatkan draft CV ATS-friendly dalam Bahasa Indonesia yang rapi, profesional, padat, dan relevan.

Data kandidat:
- Nama lengkap: ${fullName}
- Target role: ${targetRole}
- Pendidikan: ${education || '-'}
- Pengalaman kerja/organisasi: ${experience || '-'}
- Skills: ${skills || '-'}
- Projects: ${projects || '-'}
- Certifications: ${certifications || '-'}

Aturan output:
- Keluarkan dalam format JSON valid.
- Jangan beri markdown.
- Gunakan struktur persis seperti ini:
{
  "professional_summary": "string",
  "skills": ["string"],
  "experience_bullets": ["string"],
  "project_bullets": ["string"],
  "education_section": "string",
  "certification_section": "string",
  "ats_tips": ["string"]
}
- Summary maksimal 4 kalimat.
- Skills maksimal 12 item.
- Experience bullets maksimal 6 item.
- Project bullets maksimal 4 item.
- Tulis bullet dengan gaya ATS yang kuat, jelas, dan terukur bila memungkinkan.
`;

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt
    });

    const rawText = response.text?.trim();
    if (!rawText) {
      return NextResponse.json(
        { message: 'Gemini tidak mengembalikan hasil.' },
        { status: 500 }
      );
    }

    const text = cleanJson(rawText);

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          message: 'Output AI bukan JSON valid.',
          raw: rawText
        },
        { status: 500 }
      );
    }

    const saved = await prisma.cV.create({
      data: {
        userId: user.id,
        title: `${fullName} - ${targetRole}`,
        fullName,
        targetRole,
        education: education || '',
        experience: experience || '',
        skills: skills || '',
        projects: projects || '',
        certifications: certifications || '',
        generatedSummary: parsed.professional_summary || '',
        generatedSkills: JSON.stringify(parsed.skills || []),
        generatedExperience: JSON.stringify(parsed.experience_bullets || []),
        generatedProjects: JSON.stringify(parsed.project_bullets || []),
        generatedEducation: parsed.education_section || '',
        generatedCertifications: parsed.certification_section || '',
        generatedTips: JSON.stringify(parsed.ats_tips || [])
      }
    });

    return NextResponse.json({
      message: 'CV ATS berhasil digenerate.',
      cv: saved,
      result: parsed
    });
  } catch (error: any) {
    console.error('CV GENERATE ERROR:', error);

    return NextResponse.json(
      {
        message: error?.message || 'Terjadi kesalahan server.'
      },
      { status: 500 }
    );
  }
}