import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const program = await prisma.program.findUnique({
    where: { id: params.id },
  });
  if (!program) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }
  return NextResponse.json(program);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, description, image } = await req.json();
  const updatedProgram = await prisma.program.update({
    where: { id: params.id },
    data: {
      name,
      description,
      image,
    },
  });
  return NextResponse.json(updatedProgram);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.program.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: 'Program deleted' });
}
