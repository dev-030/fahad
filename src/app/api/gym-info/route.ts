import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const gymInfo = await prisma.gymInfo.findFirst();
    if (!gymInfo) {
      return NextResponse.json({ error: 'Gym info not found' }, { status: 404 });
    }
    return NextResponse.json(gymInfo);
  } catch (error) {
    console.error('Failed to fetch gym info:', error);
    return NextResponse.json({ error: 'Failed to fetch gym info' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { address, phone, email, workingHours, facebookUrl, instagramUrl } = body;

    const gymInfo = await prisma.gymInfo.findFirst();
    if (!gymInfo) {
      return NextResponse.json({ error: 'Gym info not found' }, { status: 404 });
    }

    const updatedGymInfo = await prisma.gymInfo.update({
      where: { id: gymInfo.id },
      data: {
        address,
        phone,
        email,
        workingHours,
        facebookUrl,
        instagramUrl,
      },
    });

    return NextResponse.json(updatedGymInfo);
  } catch (error) {
    console.error('Failed to update gym info:', error);
    return NextResponse.json({ error: 'Failed to update gym info' }, { status: 500 });
  }
}
