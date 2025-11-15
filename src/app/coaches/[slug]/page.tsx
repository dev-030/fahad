'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  FaTrophy,
  FaFistRaised,
  FaShieldAlt,
  FaStar,
  FaQuoteLeft,
  FaPlayCircle,
} from 'react-icons/fa';
import ConsultationModal from '@/components/ConsultationModal';

/* ---------- ICON MAP ---------- */
const iconComponents: { [key: string]: React.ComponentType<any> } = {
  FaTrophy,
  FaFistRaised,
  FaShieldAlt,
  FaStar,
  FaQuoteLeft,
  FaPlayCircle,
};
const DynamicIcon = ({ name }: { name: string }) => {
  const Icon = iconComponents[name];
  return Icon ? <Icon /> : null;
};

/* ---------- VIDEO MODAL ---------- */
const VideoModal = ({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) => {
  if (!videoUrl) return null;

  const isYouTube = /youtu\.?be/.test(videoUrl);
  const embedUrl = isYouTube
    ? videoUrl
        .replace('watch?v=', 'embed/')
        .replace('youtu.be/', 'www.youtube.com/embed/')
    : videoUrl;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl hover:text-red-500"
        >
          &times;
        </button>

        {isYouTube ? (
          <iframe
            src={
              embedUrl +
              '?autoplay=1&mute=1&controls=1&loop=1&playlist=' +
              (videoUrl.split('v=')[1] ?? '')
            }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        ) : (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full rounded-lg"
          ></video>
        )}
      </div>
    </div>
  );
};

/* ---------- MP4 FRAME EXTRACTOR ---------- */
async function extractPosterFromVideo(videoUrl: string, timeInSeconds = 1): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'auto';

    video.addEventListener('loadeddata', () => {
      const targetTime = Math.min(timeInSeconds, video.duration - 0.1);
      video.currentTime = targetTime > 0 ? targetTime : 0.1;
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('No canvas context');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg'));
    });

    video.addEventListener('error', (err) => reject(err));
  });
}

/* ---------- YOUTUBE THUMBNAIL ---------- */
const getYouTubeThumbnail = (url: string): string | null => {
  const match = url.match(/(youtu\.be\/|v=)([^&]+)/);
  return match ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg` : null;
};

/* ======================== MAIN COMPONENT ======================== */
export default function CoachPage() {
  const params = useParams();
  const coachSlug = params.slug as string;

  const [coach, setCoach] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [posters, setPosters] = useState<{ [key: string]: string }>({});

  const openVideoModal = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
  };
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideoUrl('');
  };

  /* ---------- FETCH COACH DATA ---------- */
  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const response = await fetch(`/api/coaches/${coachSlug}`);
        if (!response.ok) throw new Error('Failed to fetch coach data');
        const data = await response.json();
        setCoach(data);
      } catch (error) {
        console.error('Error fetching coach:', error);
      }
    };
    if (coachSlug) fetchCoach();
  }, [coachSlug]);

  /* ---------- GENERATE MP4 POSTERS ---------- */
  useEffect(() => {
    if (!coach?.gallery) return;
    (coach.gallery ?? []).forEach(async (videoUrl: string) => {
      const isYouTube = /youtu\.?be/.test(videoUrl);
      if (!isYouTube && !posters[videoUrl]) {
        try {
          const img = await extractPosterFromVideo(videoUrl, 1);
          setPosters((prev) => ({ ...prev, [videoUrl]: img }));
        } catch {
          console.warn('Failed to capture poster for', videoUrl);
        }
      }
    });
  }, [coach]);

  if (!coach) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold">Loading coach data…</h1>
      </div>
    );
  }

  /* ---------- MAIN VIEW ---------- */
  return (
    <main className="relative flex min-h-screen flex-col bg-black text-white overflow-hidden">
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #dc2626 0%, #f87171 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.2);
        }
      `}</style>

      {/* ---------- HERO: MP4 or YouTube (full-bleed) ---------- */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/youtu\.?be/.test(coach.videoUrl) ? (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2 scale-[1.2]"
              src={
                coach.videoUrl
                  .replace('watch?v=', 'embed/')
                  .replace('youtu.be/', 'www.youtube.com/embed/') +
                '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=' +
                (coach.videoUrl.split('v=')[1] ?? '')
              }
              title="YouTube hero background"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ) : (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
            autoPlay
            loop
            muted
            playsInline
            src={coach.videoUrl}
          ></video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-8">
          <p className="text-xl md:text-2xl text-red-500 font-bold uppercase tracking-widest">
            {coach.title}
          </p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mt-2">
            {coach.name}
          </h1>
        </div>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold uppercase mb-6">
                <span className="gradient-text">The</span> Philosophy
              </h2>
              <p className="text-xl italic text-neutral-300 leading-relaxed mb-12 border-l-4 border-red-600 pl-6">
                {coach.philosophy}
              </p>

              <h2 className="text-4xl font-bold uppercase mb-6">
                <span className="gradient-text">The</span> Story
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed whitespace-pre-line">
                {coach.bio}
              </p>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-black p-8 rounded-lg border border-neutral-800 sticky top-24">
                <h3 className="text-2xl font-bold uppercase mb-6 text-center gradient-text">
                  Accolades
                </h3>
                <ul className="space-y-4 mb-10">
                  {(coach.achievements ?? []).map((item: any) => (
                    <li key={item.text} className="flex items-center gap-4">
                      <div className="text-red-500 text-2xl">
                        <DynamicIcon name={item.icon} />
                      </div>
                      <span className="text-neutral-200">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-6 uppercase tracking-wider transition-all rounded-md hover:shadow-lg hover:shadow-red-600/50 hover:scale-105"
                >
                  Book a Private Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-black uppercase mb-12 text-center">
            <span className="gradient-text">Warrior</span> Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(coach.gallery ?? []).map((videoUrl: string, index: number) => {
              const isYouTube = /youtu\.?be/.test(videoUrl);
              const poster = isYouTube ? getYouTubeThumbnail(videoUrl) : posters[videoUrl];

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg aspect-[16/9] cursor-pointer bg-neutral-900"
                  onClick={() => openVideoModal(videoUrl)}
                >
                  {isYouTube ? (
                    <img
                      src={poster ?? ''}
                      alt="Video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={videoUrl}
                      muted
                      playsInline
                      poster={poster}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    ></video>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                    <FaPlayCircle className="text-white text-6xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {isVideoModalOpen && (
        <VideoModal videoUrl={currentVideoUrl} onClose={closeVideoModal} />
      )}
    </main>
  );
}