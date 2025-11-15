import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.discipline.create({
    data: {
      name: 'Fitness',
      slug: 'fitness',
      heroImage: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f1701389a222b62a80b254_mt_header_2.jpg',
      heroTitle: 'FITNESS FOR LIFE',
      description: `Our fitness program is designed to help you achieve your health and wellness goals, whatever they may be. Whether you are looking to lose weight, to build muscle, to increase your endurance, or simply to live a healthier lifestyle, our program can be tailored to meet your specific needs. We offer a variety of classes, from high-intensity interval training (HIIT) to strength and conditioning, to help you reach your full potential.
Our experienced coaches will work with you to create a personalized fitness plan that is safe, effective, and sustainable. We will provide you with the guidance, support, and motivation you need to stay on track and to achieve your goals. We believe that fitness should be fun and engaging, and we strive to create a positive and supportive environment where you can thrive.`,
      sections: JSON.stringify([
        {
          title: 'STRENGTH & CONDITIONING',
          content: 'Our strength and conditioning classes are designed to help you build muscle, increase your strength, and improve your overall athleticism. We use a variety of training methods, including free weights, kettlebells, and bodyweight exercises, to help you reach your goals.',
        },
        {
          title: 'HIIT',
          content: 'High-intensity interval training (HIIT) is a form of cardio that involves short bursts of intense exercise followed by brief periods of rest. HIIT is a great way to burn calories, to improve your cardiovascular health, and to boost your metabolism.',
        },
        {
          title: 'PERSONAL TRAINING',
          content: 'Our personal training sessions are designed to provide you with one-on-one coaching and support. We will work with you to create a personalized fitness plan that is tailored to your specific needs and goals.',
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
