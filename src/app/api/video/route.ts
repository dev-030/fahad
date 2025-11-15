
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const video = await prisma.video.findFirst();
  console.log({video});
  return NextResponse.json(video);
}

export async function PUT(request: Request) {
  const { url } = await request.json();
  const video = await prisma.video.update({
    where: { id: 1 },
    data: { url },
  });
  return NextResponse.json(video);
}
