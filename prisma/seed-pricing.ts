import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pricingTiers = [
  {
    title: 'MUAY THAI ONLY',
    price: 19.99,
    duration: 'Per Month for 6 Months',
    features: [
      { text: 'Access Fitness Equipment', included: true },
      { text: 'Access to Open Gym', included: true },
      { text: 'Access 6 Days / Week', included: true },
      { text: 'Style Specific Group Classes', included: true },
      { text: 'Recovery Room', included: false },
      { text: 'Included Private Lessons', included: false },
    ],
    type: 'ADULTS',
    highlighted: false,
  },
  {
    title: 'JIU JITSU ONLY',
    price: 19.99,
    duration: 'Per Month for 6 Months',
    features: [
      { text: 'Access Fitness Equipment', included: true },
      { text: 'Access to Open Gym', included: true },
      { text: 'Access 6 Days / Week', included: true },
      { text: 'Style Specific Group Classes', included: true },
      { text: 'Recovery Room', included: false },
      { text: 'Included Private Lessons', included: false },
    ],
    type: 'ADULTS',
    highlighted: false,
  },
  {
    title: 'ALL INCLUSIVE',
    price: 39.99,
    duration: 'Per Month for 6 Months',
    features: [
      { text: 'Access Fitness Equipment', included: true },
      { text: 'Access to Open Gym', included: true },
      { text: 'Access 6 Days / Week', included: true },
      { text: 'All Group Classes', included: true },
      { text: 'Access All Available Classes', included: true },
      { text: 'Recovery Room', included: false },
      { text: 'Included Private Lessons', included: false },
    ],
    type: 'ADULTS',
    highlighted: false,
  },
  {
    title: 'PREMIER**',
    price: 99.99,
    duration: 'Per Month for 6 Months',
    features: [
      { text: 'Access Fitness Equipment', included: true },
      { text: 'Access to Open Gym', included: true },
      { text: 'Access 6 Days / Week', included: true },
      { text: 'All Group Classes', included: true },
      { text: 'Access All Available Classes', included: true },
      { text: 'Recovery Room', included: true },
      { text: 'One Private Lesson per Month', included: true },
    ],
    type: 'ADULTS',
    highlighted: true,
  },
  {
    title: 'MUAY THAI ONLY',
    price: 99.99,
    duration: 'Per Month for 6 Months',
    features: [],
    type: 'KIDS',
    highlighted: false,
  },
  {
    title: 'JIU JITSU ONLY',
    price: 99.99,
    duration: 'Per Month for 6 Months',
    features: [],
    type: 'KIDS',
    highlighted: false,
  },
  {
    title: 'ALL INCLUSIVE',
    price: 19.99,
    duration: 'Per Month for 6 Months',
    features: [],
    type: 'KIDS',
    highlighted: false,
  },
];

async function main() {
  console.log('Clearing pricing tiers...');
  await prisma.pricingTier.deleteMany({});
  console.log('Seeding pricing tiers...');
  for (const tier of pricingTiers) {
    await prisma.pricingTier.create({
      data: {
        ...tier,
        features: JSON.stringify(tier.features),
      },
    });
  }
  console.log('Pricing tiers seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
