
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any)?.id as string },
    select: {
      id: true,
      username: true,
      email: true,
    }
  });

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { username, oldPassword, newPassword } = body;

  const userId = (session.user as any)?.id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  let dataToUpdate: any = { username };

  if (newPassword) {
    if (!oldPassword) {
      return NextResponse.json({ error: 'Old password is required to change password' }, { status: 400 });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Incorrect old password' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    dataToUpdate.password = hashedPassword;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate,
    select: {
      id: true,
      username: true,
      email: true,
    }
  });

  return NextResponse.json(updatedUser);
}
