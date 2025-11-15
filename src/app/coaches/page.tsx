import { fetchApi } from '@/lib/api';
import React from 'react';
import { AnimatedCoachModal, CoachDetail } from '@/components/AnimatedCoachModal';
import { ValueBlock } from '@/components/Landing/LandingCard';
import CoachesClientPage from './CoachesClientPage'; // New client component

interface Coach {
    id: string;
    name: string;
    specialties: string[];
    imageUrl: string;
}

interface CoachDetailsData { [key: string]: CoachDetail; }

const CoachesPage = async () => {
  const coachesData: Coach[] = await fetchApi('coaches', { cache: 'no-store' });

  const allCoachDetails: CoachDetailsData = {};
  await Promise.all(coachesData.map(async (coach) => {
    const coachDetail: CoachDetail = await fetchApi(`coaches/${coach.id}`, { cache: 'no-store' });
    allCoachDetails[coach.id] = coachDetail;
  }));

  const coachesSectionData = await fetchApi('landing-page/coaches', { cache: 'no-store' });

  return (
    <CoachesClientPage coachesData={coachesData} allCoachDetails={allCoachDetails} coachesSectionData={coachesSectionData} />
  );
};

export default CoachesPage;
