import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const addons = await prisma.addon.findMany();
  return NextResponse.json(addons);
}

export async function POST(req: Request) {
  const { name, price, description } = await req.json();
  const newAddon = await prisma.addon.create({
    data: {
      name,
      price,
      description,
    },
  });
  return NextResponse.json(newAddon, { status: 201 });
}
