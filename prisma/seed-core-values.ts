
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCoreValues() {
  const coreValues = [
    {
      title: 'Discipline',
      description: 'Cultivating focus, dedication, and self-control.',
    },
    {
      title: 'Respect',
      description: 'Honoring our coaches, training partners, and ourselves.',
    },
    {
      title: 'Integrity',
      description: 'Upholding honesty and strong moral principles.',
    },
    {
      title: 'Community',
      description: 'Building a supportive and inclusive family of martial artists.',
    },
  ];

  for (const value of coreValues) {
    await prisma.coreValue.upsert({
      where: { title: value.title },
      update: { description: value.description },
      create: value,
    });
  }

  await prisma.landingPageSection.upsert({
    where: { name: 'core_values_title' },
    update: { content: 'Our Core Values' },
    create: { name: 'core_values_title', content: 'Our Core Values' },
  });

  await prisma.landingPageSection.upsert({
    where: { name: 'core_values_description' },
    update: { content: 'We are more than a gym; we are a community united by a passion for martial arts and a commitment to personal excellence. Our core values guide every class, every interaction, and every step of our journey together.' },
    create: { name: 'core_values_description', content: 'We are more than a gym; we are a community united by a passion for martial arts and a commitment to personal excellence. Our core values guide every class, every interaction, and every step of our journey together.' },
  });
}
