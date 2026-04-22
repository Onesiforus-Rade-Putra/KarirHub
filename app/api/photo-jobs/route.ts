import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getGeminiClient } from '@/lib/gemini';
import { getCurrentUserOrDemo } from '@/lib/auth';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const ratioMap: Record<string, string> = {
  'Rasio 4:5': '4:5',
  'Rasio 1:1': '1:1'
};

export async function POST(req: Request) {
  try {
    const gemini = getGeminiClient();
    const user = await getCurrentUserOrDemo();

    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 401 });
    }

    const formData = await req.formData();

    const file = formData.get('file') as File | null;
    const style = String(formData.get('style') || 'Formal Corporate');
    const background = String(formData.get('background') || 'Background putih');
    const ratio = String(formData.get('ratio') || 'Rasio 4:5');

    if (!file) {
      return NextResponse.json({ message: 'File foto wajib diupload.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Input = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';

    const prompt = `
Gunakan foto referensi yang diupload sebagai dasar wajah utama.
Buat ulang menjadi foto CV formal yang terlihat profesional dan realistis.
Ketentuan:
- tetap pertahankan identitas wajah semirip mungkin
- ubah menjadi headshot profesional
- pakaian rapi formal / smart business
- gaya: ${style}
- latar belakang: ${background}
- framing portrait untuk CV
- hasil bersih, natural, tidak berlebihan
- jangan tambahkan teks, watermark, atau elemen dekoratif
`;

    const response = await gemini.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [
        {
          inlineData: {
            mimeType,
            data: base64Input
          }
        },
        { text: prompt }
      ]
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((part: any) => part.inlineData?.data);

    if (!imagePart?.inlineData?.data) {
      const textPart = parts.find((part: any) => part.text)?.text || '';
      return NextResponse.json(
        {
          message: textPart || 'AI tidak mengembalikan gambar.'
        },
        { status: 500 }
      );
    }

    const outputMime = imagePart.inlineData.mimeType || 'image/png';
    const outputBase64 = imagePart.inlineData.data as string;
    const ext = outputMime.includes('png') ? 'png' : 'jpg';

    const fileName = `cv-photo-${Date.now()}.${ext}`;
    const outputDir = path.join(process.cwd(), 'public', 'generated');
    const outputPath = path.join(outputDir, fileName);

    let resultUrl: string;

    try {
      await mkdir(outputDir, { recursive: true });
      const outputBytes = Uint8Array.from(Buffer.from(outputBase64, 'base64'));
      await writeFile(outputPath, outputBytes);
      resultUrl = `/generated/${fileName}`;
    } catch (fileError) {
      console.error('PHOTO FILE WRITE ERROR:', fileError);
      resultUrl = `data:${outputMime};base64,${outputBase64}`;
    }

    const job = await prisma.photoJob.create({
      data: {
        userId: user.id,
        style,
        background,
        ratio,
        status: 'COMPLETED',
        resultUrl
      }
    });

    return NextResponse.json({
      message: 'Foto CV berhasil digenerate.',
      job: {
        style: job.style,
        background: job.background,
        ratio: job.ratio,
        resultUrl: job.resultUrl
      }
    });
  } catch (error: any) {
    console.error('PHOTO JOB ERROR:', error);

    const rawMessage =
      error?.message ||
      error?.error?.message ||
      'Terjadi kesalahan server saat generate foto.';

    const friendlyMessage =
      rawMessage.includes('Quota') ||
      rawMessage.includes('RESOURCE_EXHAUSTED')
        ? 'Generate foto AI belum tersedia di free tier Gemini. Untuk sekarang pakai hasil demo dulu atau aktifkan billing.'
        : rawMessage;

    return NextResponse.json(
      {
        message: friendlyMessage
      },
      { status: 500 }
    );
  }
}