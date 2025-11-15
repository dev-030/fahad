import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  const section = await prisma.landingPageSection.findUnique({
    where: { name },
  });

  if (!section) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }

  return NextResponse.json(section);
}

export async function PUT(
  request: Request,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  const { content } = await request.json();

  const updatedSection = await prisma.landingPageSection.update({
    where: { name },
    data: { content },
  });

  return NextResponse.json(updatedSection);
}