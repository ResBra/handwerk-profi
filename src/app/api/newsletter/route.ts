import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'E-Mail ist erforderlich.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (!existing.isActive) {
        // Reactivate
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true },
        });
        return NextResponse.json({ message: 'Newsletter reaktiviert.' }, { status: 200 });
      }
      return NextResponse.json(
        { message: 'Diese E-Mail ist bereits registriert.' },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email },
    });

    return NextResponse.json({ success: true, data: subscriber }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/newsletter:', error);
    return NextResponse.json(
      { message: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
