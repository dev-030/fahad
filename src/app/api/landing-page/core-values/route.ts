import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const values = await prisma.coreValue.findMany();
    const titleSection = await prisma.landingPageSection.findUnique({
      where: { name: 'core_values_title' },
    });
    const descriptionSection = await prisma.landingPageSection.findUnique({
      where: { name: 'core_values_description' },
    });

    return NextResponse.json({
      title: titleSection?.content || '',
      description: descriptionSection?.content || '',
      values,
    });
  } catch (error) {
    console.error('Error fetching core values:', error);
    return NextResponse.json({ message: 'Failed to fetch core values' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, values } = await request.json();

    if (title !== undefined) {
      await prisma.landingPageSection.upsert({
        where: { name: 'core_values_title' },
        update: { content: title },
        create: { name: 'core_values_title', content: title },
      });
    }

    if (description !== undefined) {
      await prisma.landingPageSection.upsert({
        where: { name: 'core_values_description' },
        update: { content: description },
        create: { name: 'core_values_description', content: description },
      });
    }

    if (values && Array.isArray(values)) {
      const existingValues = await prisma.coreValue.findMany();
      const newValuesTitles = new Set(values.map((v: { title: string; }) => v.title));

      for (const existingValue of existingValues) {
        if (!newValuesTitles.has(existingValue.title)) {
          await prisma.coreValue.delete({
            where: { id: existingValue.id },
          });
        }
      }

      for (const value of values) {
        if (value.title) {
          await prisma.coreValue.upsert({
            where: { title: value.title },
            update: { description: value.description },
            create: { title: value.title, description: value.description },
          });
        }
      }
    }

    return NextResponse.json({ message: 'Core values updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating core values:', error);
    return NextResponse.json({ message: 'Failed to update core values' }, { status: 500 });
  }
}
