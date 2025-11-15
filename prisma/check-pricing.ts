import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pricingTiers = await prisma.pricingTier.findMany();
  console.log(pricingTiers);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
