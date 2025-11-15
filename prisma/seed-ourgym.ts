
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  try {
    await db.ourGym.create({
      data: {
        title: 'Our Gym',
        content: 'Our gym has had both a local and a national presence since its founding in 2011, however its roots go much deeper. Our Team has been training and competing across the world in multiple combat sports to bring you the best instruction available. We are athletes, hobbyists, competitors, students and professionals. We strive to learn and grow while pushing others around us to do the same. We are people who always are working to improve ourselves and our community. We are a family, and we are a team.',
        imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f2d_Large_Banner.webp',
      },
    });
  } catch (error) {
    console.error('Error seeding our gym data:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
