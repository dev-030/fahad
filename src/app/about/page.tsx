'use client';
import React, { useEffect, useState } from "react";
import { FaTrophy, FaUserShield, FaHeartbeat, FaFistRaised, FaUsers, FaEye } from 'react-icons/fa';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const coreValues = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      ),
      title: "Community",
      description: "Fostering a supportive and motivating family of warriors who uplift and inspire one another."
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      title: "Integrity",
      description: "Upholding the highest standards of honesty and transparency in our training and business practices."
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      ),
      title: "Excellence",
      description: "Committing to continuous improvement and the pursuit of greatness in every aspect of fitness."
    }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop"
  ];

  return (
    <main className="relative flex min-h-screen flex-col bg-neutral-950 text-white overflow-hidden">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .gradient-text {
          background: linear-gradient(135deg, #dc2626 0%, #f87171 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-effect {
          background: rgba(23, 23, 23, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.3);
        }
        .gallery-image {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease;
        }
        .gallery-image:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
        }
        
        /* Custom Video Controls Styling */
        video::-webkit-media-controls-panel {
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
        }
        
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-volume-slider,
        video::-webkit-media-controls-mute-button,
        video::-webkit-media-controls-timeline,
        video::-webkit-media-controls-current-time-display,
        video::-webkit-media-controls-time-remaining-display,
        video::-webkit-media-controls-fullscreen-button {
          filter: brightness(1.2);
        }
        
        video::-webkit-media-controls-timeline {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden"
      >
        <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1581009137042-c552e485697a?w=1200&h=600&fit=crop)` }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className={`relative z-10 container mx-auto px-8 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            More Than A <span className="gradient-text">Gym</span>
          </h1>
          <p className="mt-6 text-xl text-neutral-300 max-w-3xl mx-auto">
            Discover the story, values, and philosophy that forge the heart of the Cowarrior community.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
              <h2 className="text-5xl font-black uppercase mb-6 gradient-text">Our Story</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mb-8"></div>
              <p className="text-lg text-neutral-300 mb-4 leading-relaxed">
                Cowarrior Gym was forged from a rebellious spirit—a belief that fitness is a path to self-discovery, not just a routine. Founded by veteran athletes, our mission was to create an arena where passion overcomes pain and community builds champions.
              </p>
              <p className="text-lg text-neutral-300 leading-relaxed">
                We reject the sterile, one-size-fits-all model. Here, every drop of sweat tells a story of dedication. We are a collective of individuals bound by a shared commitment to push beyond perceived limits and redefine what's possible.
              </p>
            </div>
            <div className={`relative h-96 w-full rounded-2xl overflow-hidden hover-lift ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.4s' }}>
              <img 
                src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1000&h=800&fit=crop" 
                alt="Gym founder coaching a member" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-5xl font-black uppercase mb-16 gradient-text">Our Warrior Code</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index} 
                className={`glass-effect p-8 rounded-2xl hover-lift ${isVisible ? 'animate-fade-in-up' : ''}`} 
                style={{ animationDelay: `${0.2 * (index + 1)}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {value.icon}
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Philosophy Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`relative h-96 w-full rounded-2xl overflow-hidden hover-lift order-last md:order-first ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.4s' }}>
              <video 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                controls
                controlsList="nodownload"
                preload="metadata"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className={`${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
              <h2 className="text-5xl font-black uppercase mb-6 gradient-text">Our Philosophy</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mb-8"></div>
              <p className="text-lg text-neutral-300 mb-4 leading-relaxed">
                We train for life's battles. Our philosophy blends functional strength, metabolic conditioning, and mental resilience. We don't just build bodies; we build modern-day warriors ready for any challenge.
              </p>
              <p className="text-lg text-neutral-300 leading-relaxed">
                Our programs are intense, purposeful, and programmed for progress. With a focus on compound movements and high-intensity intervals, we ensure every session is a step toward peak performance, guided by coaches who live and breathe the warrior ethos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Gallery Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-black uppercase mb-16 text-center gradient-text">
            Our Battleground
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
                <div key={index} className={`group relative rounded-xl overflow-hidden h-64 ${index === 0 ? 'col-span-2 row-span-2 h-auto' : ''}`}>
                    <img src={src} alt={`Facility image ${index + 1}`} className="h-full w-full object-cover gallery-image" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}