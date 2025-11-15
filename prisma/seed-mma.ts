import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.discipline.create({
    data: {
      name: 'Mixed Martial Arts',
      slug: 'mma',
      heroImage: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f1701389a222b62a80b254_mt_header_2.jpg',
      heroTitle: 'THE SPORT OF MMA',
      description: `Mixed Martial Arts (MMA) is the fastest growing sport in the world, and for good reason. It is the ultimate testing ground for martial artists, combining the most effective techniques from a variety of disciplines into a single, unified system. At Warrior, our MMA program is designed to provide students with a comprehensive understanding of the sport, from the fundamentals of striking and grappling to the advanced strategies and tactics used by professional fighters.
Our program is built on a foundation of solid fundamentals, with a focus on the seamless integration of striking, wrestling, and submission grappling. We teach students how to transition between ranges, to control the pace and location of the fight, and to capitalize on openings and opportunities as they arise. Whether your goal is to compete in the cage, to learn a complete system of self-defense, or simply to challenge yourself in a new and exciting way, our MMA program will provide you with the tools you need to succeed.`,
      sections: JSON.stringify([
        {
          title: 'STRIKING',
          content: 'Our striking curriculum is rooted in the principles of Muay Thai, with an emphasis on power, precision, and efficiency. We teach students how to use their punches, kicks, knees, and elbows to control distance, to create openings, and to finish fights.',
        },
        {
          title: 'WRESTLING',
          content: 'Wrestling is the art of control. We teach students how to take the fight to the ground, to maintain dominant positions, and to dictate the pace and location of the fight. Our wrestling program is designed to be effective in both Gi and No-Gi grappling, as well as in MMA competition.',
        },
        {
          title: 'SUBMISSION GRAPPLING',
          content: 'Our submission grappling program is based on the principles of Jiu Jitsu, with a focus on leverage, technique, and control. We teach students how to apply a wide variety of joint locks and chokeholds to submit their opponents, regardless of size or strength.',
        },
      ]),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
