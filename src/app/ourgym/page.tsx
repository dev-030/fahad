
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { OurGym } from '@/lib/types';


const OurGymPage = () => {
  const [ourGymData, setOurGymData] = useState<OurGym | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOurGymData = async () => {
      try {
        const response = await fetch('/api/ourgym');
        const data = await response.json();
        if (data) {
          setOurGymData(data);
        }
      } catch (error) {
        console.error('Error fetching Our Gym data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOurGymData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!ourGymData) {
    return <div>Content not available</div>;
  }

  return (
    <section className="bg-black text-white">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[50vh] min-h-[300px] sm:min-h-[400px] flex items-center justify-start">
        {/* Background Image using Next.js Image component for optimization */}
        <Image
          src={ourGymData.imageUrl}
          alt="Warrior Gym"
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide uppercase">
            {ourGymData.title}
          </h1>
        </div>
      </div>

      {/* White Divider Line */}
      <div className="h-px w-full bg-gray-700"></div>

      {/* About Section */}
      <div className="bg-black py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {ourGymData.content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurGymPage;