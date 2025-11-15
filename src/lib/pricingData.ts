import { AdultPlan, AddOnPlan, KidsPlan } from './types';

export const adultPlans: AdultPlan[] = [
    {
        title: 'MUAY THAI ONLY',
        description: 'Includes all open drill sessions, kickboxing, muay thai, and clinch adult classes, charged monthly.',
        price: '119.99',
        term: 'Per Month for 6 Months',
        monthly: 'or $139.99 monthly',
        features: [
            { text: 'Access Fitness Equipment', included: true },
            { text: 'Access to Open Gym', included: true },
            { text: 'Access 6 Days / Week', included: true },
            { text: 'Style Specific Group Classes', included: true },
            { text: 'Access All Available Classes', included: false },
            { text: 'Recovery Room', included: false },
            { text: 'Included Private Lessons', included: false },
        ]
    },
    {
        title: 'JIU JITSU ONLY',
        description: 'Includes all Brazilian Jiu-Jitsu (Gi and No-Gi), open drill times, and clinch classes.',
        price: '119.99',
        term: 'Per Month for 6 Months',
        monthly: 'or $139.99 monthly',
        features: [
            { text: 'Access Fitness Equipment', included: true },
            { text: 'Access to Open Gym', included: true },
            { text: 'Access 6 Days / Week', included: true },
            { text: 'Style Specific Group Classes', included: true },
            { text: 'Access All Available Classes', included: false },
            { text: 'Recovery Room', included: false },
            { text: 'Included Private Lessons', included: false },
        ]
    },
];

export const addOnPlans: AddOnPlan[] = [
    {
        title: 'WAR COLLEGE',
        description: 'FREE with the purchase of any 6 month membership. Access to our custom online curriculum. Complete with drills to practice at home, weekly updates, mindset training, and more. This is a contract add-on.',
        price: '24.99',
        term: 'Monthly',
        note: 'FREE with the purchase of any 6 month membership.',
        moreInfo: true
    },
    {
        title: 'RECOVERY ROOM',
        description: 'Access to recovery room, shower, sauna, and lockers. This is a contract add-on.',
        price: '14.99',
        term: 'Monthly'
    }
];

export const kidsPlans: KidsPlan[] = [
    { title: 'MUAY THAI ONLY', price: '99.99', term: 'Per Month for 6 Months', monthly: 'or $109.99 monthly' },
    { title: 'JIU JITSU ONLY', price: '99.99', term: 'Per Month for 6 Months', monthly: 'or $109.99 monthly' },
    { title: 'ALL INCLUSIVE', price: '119.99', term: 'Per Month for 6 Months', monthly: 'or $129.99 monthly' }
];