import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const disciplines = await prisma.featureDiscipline.findMany();
    return NextResponse.json(disciplines);
  } catch (error) {
    console.error('Error fetching disciplines:', error);
    return NextResponse.json({ message: 'Failed to fetch disciplines' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, name, href } = await request.json();
    if (!name || !href) {
      return NextResponse.json({ message: 'Name and href are required' }, { status: 400 });
    }

    if (id) {
      const discipline = await prisma.featureDiscipline.update({
        where: { id },
        data: { name, href },
      });
      return NextResponse.json(discipline, { status: 200 });
    } else {
      const discipline = await prisma.featureDiscipline.create({
        data: { name, href },
      });
      return NextResponse.json(discipline, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating/updating discipline:', error);
    return NextResponse.json({ message: 'Failed to create/update discipline' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, href } = await request.json();
    if (!id || !name || !href) {
      return NextResponse.json({ message: 'ID, name, and href are required' }, { status: 400 });
    }

    const discipline = await prisma.featureDiscipline.update({
      where: { id },
      data: { name, href },
    });
    return NextResponse.json(discipline, { status: 200 });
  } catch (error) {
    console.error('Error updating discipline:', error);
    return NextResponse.json({ message: 'Failed to update discipline' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const discipline = await prisma.featureDiscipline.update({
      where: { id },
      data,
    });
    return NextResponse.json(discipline, { status: 200 });
  } catch (error) {
    console.error('Error updating discipline:', error);
    return NextResponse.json({ message: 'Failed to update discipline' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    await prisma.featureDiscipline.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Discipline deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting discipline:', error);
    return NextResponse.json({ message: 'Failed to delete discipline' }, { status: 500 });
  }
}