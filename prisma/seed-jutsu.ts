import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.discipline.create({
    data: {
      name: 'Jiu Jitsu',
      slug: 'jutsu',
      heroImage: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f1701389a222b62a80b254_mt_header_2.jpg',
      heroTitle: 'THE ART OF JIU JITSU',
      description: `Jiu Jitsu, known as the “Gentle Art,” is a grappling-based martial art that focuses on leverage and technique to control and submit an opponent. Practitioners learn to use takedowns, positional control, and a wide array of joint locks and chokeholds to neutralize threats of all sizes. This emphasis on skill over strength makes it an ideal discipline for self-defense, sport competition, and lifelong fitness.
At Warrior, our Jiu Jitsu program is designed to be comprehensive, accessible, and effective. We offer both Gi and No-Gi classes, providing students with a well-rounded understanding of grappling in all its forms. Our curriculum is structured to build a strong foundation in fundamental principles—such as posture, pressure, and position—while also encouraging creative problem-solving and personal expression. We are proud to be an official affiliate of Easton Training Center, a renowned organization with a long history of producing world-class competitors and instructors. This partnership ensures that our students receive the highest quality instruction, with a direct lineage to the pioneers of the art. Through Easton, we provide a clear path for progression, from white belt to black belt and beyond, with a curriculum that has been tested and refined at the highest levels of competition.`,
      sections: JSON.stringify([
        {
          title: 'STREET',
          content: 'Self-defense is at the core of our Jiu Jitsu program. We teach students how to de-escalate, control, and neutralize threats in a safe and effective manner, empowering them with the confidence to protect themselves and their loved ones.',
        },
        {
          title: 'SPORT',
          content: 'For those with a competitive spirit, our program offers a direct path to local, national, and international competition. We provide the training, coaching, and support necessary to succeed at all levels, while always emphasizing sportsmanship and respect.',
        },
        {
          title: 'ART',
          content: 'Jiu Jitsu is a journey of continuous learning and self-discovery. We encourage our students to explore the depth and complexity of the art, to find their own unique style, and to share their knowledge with others.',
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
