
'use client';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

interface GymInfo {
  address: string;
  phone: string;
  workingHours: string;
  facebookUrl: string;
  instagramUrl: string;
}

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const [gymInfo, setGymInfo] = useState<GymInfo | null>(null);

  useEffect(() => {
    const fetchGymInfo = async () => {
      try {
        const response = await fetch('/api/gym-info');
        if (!response.ok) {
          throw new Error(`Failed to fetch gym info: ${response.status} ${response.statusText}`);
        }
        const data: GymInfo = await response.json();
        setGymInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGymInfo();
  }, []);

  if (isAdminPage || !gymInfo) {
    return null;
  }

  const [hoursPart1, hoursPart2] = gymInfo.workingHours.split(', ');

  return (
    <footer className="bg-[#0d0d0d] border-t border-gray-800 py-16 px-4">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f27_189493_custom_site_themes_id_Hvy2IjHPQMezsfKWPzM0_WFC%20Logo%20White%20on%20Red.png"
            alt="Warrior Fitness Center Logo"
            width={160}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Footer Info */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 text-gray-400">
          <div>
            <h4 className="font-bold text-white mb-2">WARRIOR FITNESS CENTER</h4>
            <p>{gymInfo.address.split(',').map((line, index) => <React.Fragment key={index}>{line.trim()}<br /></React.Fragment>)}</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">HOURS</h4>
            <p>{hoursPart1}<br />{hoursPart2}</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">CALL US</h4>
            <p>{gymInfo.phone}</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href={gymInfo.instagramUrl} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-3xl text-gray-500 hover:text-red-500 transition-colors" /></a>
          <a href={gymInfo.facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF className="text-3xl text-gray-500 hover:text-red-500 transition-colors" /></a>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-600">&copy; 2025 Warrior Fitness Center. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
