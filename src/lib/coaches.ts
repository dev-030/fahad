
import { Coach } from './types';

export const coaches: Coach[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Head Coach',
    imageUrl: 'https://cdn.vectorstock.com/i/500p/86/58/character-happy-boy-greeting-say-hi-hello-cartoon-vector-31698658.jpg',
    bio: 'John has been a coach for over 10 years, specializing in Muay Thai and MMA.',
    specializations: ['Muay Thai', 'MMA'],
    certifications: ['Certified Muay Thai Instructor', 'Certified MMA Coach'],
    slug: 'john-doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    socialMedia: {
      twitter: '@johndoe',
      instagram: '@johndoe'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Jiu-Jitsu Instructor',
    imageUrl: 'https://cdn.vectorstock.com/i/500p/86/58/character-happy-boy-greeting-say-hi-hello-cartoon-vector-31698658.jpg',
    bio: 'Jane is a black belt in Brazilian Jiu-Jitsu and has won multiple championships.',
    specializations: ['Jiu-Jitsu'],
    certifications: ['IBJJF Certified Black Belt'],
    slug: 'jane-smith',
    email: 'jane.smith@example.com',
    phone: '098-765-4321',
    socialMedia: {
      twitter: '@janesmith',
      instagram: '@janesmith'
    }
  },
];
