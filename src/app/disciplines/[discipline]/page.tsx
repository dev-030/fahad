'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Lens {
  title: string;
  content: string;
}

interface Discipline {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  title: string;
  description: string;
  lenses: string; // JSON string
}

export default function DisciplinePage() {
  const params = useParams();
  const disciplineSlug = params.discipline as string;
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await fetch(`/api/disciplines/${disciplineSlug}`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Discipline = await response.json();
        setDiscipline(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (disciplineSlug) {
      fetchDiscipline();
    }
  }, [disciplineSlug]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading discipline details...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Error: {error}</div>;
  }

  if (!discipline) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold">Discipline not found.</h1>
      </div>
    );
  }

  const parsedLenses: Lens[] = JSON.parse(discipline.lenses);

  return (
    <main className="bg-black text-white font-['Exo']">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${discipline.imageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
            {discipline.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>{discipline.description}</p>
            
            {parsedLenses.map((lens, index) => (
              <div key={index} className="pt-4">
                <div className="flex items-center">
                  <div className="w-1 h-8 bg-red-600"></div>
                  <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">{lens.title}</h2>
                </div>
                <p className="mt-4">{lens.content}</p>
              </div>
            ))}
            
            <p className="pt-4">
              Our athletes embody this journey, using {discipline.name} to achieve goals in fitness, competition, and life. Whether your aim is to compete, improve health, or develop confidence and discipline, our {discipline.name} program equips you with the tools to succeed.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
