import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const descriptionSection = await prisma.landingPageSection.findUnique({
      where: { name: 'features_description' },
    });
    const subtitleSection = await prisma.landingPageSection.findUnique({
      where: { name: 'features_subtitle' },
    });

    return NextResponse.json({
      description: descriptionSection?.content || '',
      subtitle: subtitleSection?.content || '',
    });
  } catch (error) {
    console.error('Error fetching features description:', error);
    return NextResponse.json({ message: 'Failed to fetch features description' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { description, subtitle } = await request.json();

    if (description !== undefined) {
      await prisma.landingPageSection.upsert({
        where: { name: 'features_description' },
        update: { content: description },
        create: { name: 'features_description', content: description },
      });
    }

    if (subtitle !== undefined) {
      await prisma.landingPageSection.upsert({
        where: { name: 'features_subtitle' },
        update: { content: subtitle },
        create: { name: 'features_subtitle', content: subtitle },
      });
    }

    return NextResponse.json({ message: 'Features description updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating features description:', error);
    return NextResponse.json({ message: 'Failed to update features description' }, { status: 500 });
  }
}