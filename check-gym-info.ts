import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkGymInfo() {
  try {
    const gymInfo = await prisma.gymInfo.findFirst();
    if (gymInfo) {
      console.log('Gym info found in database:');
      console.log(gymInfo);
    } else {
      console.log('No gym info found in the database.');
    }
  } catch (error) {
    console.error('Error checking gym info:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkGymInfo();
