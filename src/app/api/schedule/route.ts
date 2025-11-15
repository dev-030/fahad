import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const schedule = await prisma.schedule.findMany();
  return NextResponse.json(schedule);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newSchedule = await prisma.schedule.create({
    data,
  });
  return NextResponse.json(newSchedule);
}