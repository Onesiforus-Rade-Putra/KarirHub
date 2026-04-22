import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserOrDemo } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const user = await getCurrentUserOrDemo();
    if (!user) {
      return NextResponse.json([]);
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: { service: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('GET ORDERS ERROR:', error);
    return NextResponse.json(
      { message: error?.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUserOrDemo();
    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
    }

    const body = await request.json();
    const serviceId = String(body.serviceId || '').trim();
    const customerName = String(body.customerName || '').trim();
    const email = String(body.email || '').trim();
    const paymentMethod = String(body.paymentMethod || '').trim();
    const notes = String(body.notes || '').trim();

    if (!serviceId || !customerName || !email || !paymentMethod) {
      return NextResponse.json({ message: 'Data checkout belum lengkap.' }, { status: 400 });
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return NextResponse.json({ message: 'Layanan tidak ditemukan.' }, { status: 404 });
    }

    const platformFee = 5000;

    const order = await prisma.order.create({
      data: {
        customerName,
        email,
        paymentMethod,
        notes: notes || null,
        total: service.price + platformFee,
        platformFee,
        userId: user.id,
        serviceId: service.id
      },
      include: { service: true }
    });

    return NextResponse.json({ message: 'Order berhasil dibuat.', order }, { status: 201 });
  } catch (error: any) {
    console.error('POST ORDER ERROR:', error);
    return NextResponse.json(
      { message: error?.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}