import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const addon = await prisma.addon.findUnique({
    where: { id: params.id },
  });
  if (!addon) {
    return NextResponse.json({ error: 'Addon not found' }, { status: 404 });
  }
  return NextResponse.json(addon);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, price, description } = await req.json();
  const updatedAddon = await prisma.addon.update({
    where: { id: params.id },
    data: {
      name,
      price,
      description,
    },
  });
  return NextResponse.json(updatedAddon);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.addon.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: 'Addon deleted' });
}
