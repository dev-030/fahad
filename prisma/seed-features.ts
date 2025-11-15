import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFeatures() {
  const disciplines = [
    { name: 'Brazillian Jiu-Jitsu', href: '/disciplines/jutsu' },
    { name: 'Muay Thai', href: '/disciplines/mua-thai' },
    { name: 'Mixed Martial Arts', href: '/disciplines/mma' },
    { name: 'Fitness', href: '/disciplines/fitness' },
  ];

  for (const discipline of disciplines) {
    await prisma.featureDiscipline.upsert({
      where: { name: discipline.name },
      update: { href: discipline.href },
      create: discipline,
    });
  }

  const gymFeatures = [
    { icon: 'FaDumbbell', text: 'Access to Open Gym' },
    { icon: 'FaBatteryFull', text: 'Recovery and Wellness Facilities' },
    { icon: 'FaCalendarAlt', text: 'Open 6 Days / Week' },
    { icon: 'FaUserFriends', text: '12 Trainers' },
    { icon: 'FaMedal', text: '23 World Medals' },
    { icon: 'FaSmile', text: '1478 Happy Clients' },
  ];

  for (const feature of gymFeatures) {
    await prisma.gymFeature.upsert({
      where: { text: feature.text },
      update: { icon: feature.icon },
      create: feature,
    });
  }

  const description = `We are students, athletes, and builders of our team. <strong class="text-white">Warrior Fitness Center</strong> is home to a diverse and dedicated community united by our shared pursuit of growth through martial arts. Our training blends Brazillian Jiu-Jitsu, Muay Thai, Wrestling, Judo, and MMA to foster personal development, confidence, and discipline in an atmosphere that feels like family.

Our coaching staff reflects the diversity of our community, each bringing a wealth of experience from different walks of life. This variety isn’t just a point of pride; it’s a strength that enriches our students’ learning. With coaches who’ve lived through high-level competition, military service, and personal transformation, we offer perspectives that go beyond the technical and into the mental, emotional, and strategic dimensions of martial arts.

Whether you’re just starting your journey or looking to sharpen your edge, you’ll find guidance, accountability, and support here. We are a team that trains, learns, and grows together—while pushing each other toward the next accomplishment in life.`;

  await prisma.landingPageSection.upsert({
    where: { name: 'features_description' },
    update: { content: description },
    create: { name: 'features_description', content: description },
  });
  
  await prisma.landingPageSection.upsert({
    where: { name: 'features_subtitle' },
    update: { content: 'We are a family, and we are a team.' },
    create: { name: 'features_subtitle', content: 'We are a family, and we are a team.' },
  });
}
