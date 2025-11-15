import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const sections = await prisma.landingPageSection.findMany();
  return NextResponse.json(sections);
}

export async function POST(req: Request) {
  const { name, content } = await req.json();
  const newSection = await prisma.landingPageSection.create({
    data: {
      name,
      content,
    },
  });
  return NextResponse.json(newSection, { status: 201 });
}
