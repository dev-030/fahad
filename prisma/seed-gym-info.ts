import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.gymInfo.deleteMany({});
  await prisma.gymInfo.create({
    data: {
      address: '3711 Drennan Road, Colorado Springs, CO 80916',
      phone: '+1-719-465-2136',
      email: 'info@cowarrior.com',
      workingHours: 'Monday-Friday: 11:30 - 21:30, Saturday: 09:00 - 13:00',
      facebookUrl: '#',
      instagramUrl: '#',
    },
  });
  console.log('Seeded gym info');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
