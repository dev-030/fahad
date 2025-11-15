'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Component, Image as ImageIcon, Users, Shield, Trophy, Star } from 'lucide-react';

export default function LandingPage() {
  const sections = [
    { name: 'intro-hero', title: 'Intro Landing Hero Section', icon: ImageIcon },
    { name: 'second-hero', title: 'Second Hero Section', icon: Component },
    { name: 'video', title: 'Third Only Video Section', icon: Component },
    { name: 'features', title: 'GYM FEATURES section', icon: Trophy },
    { name: 'core-values', title: 'Are we right for you section', icon: Star },
    { name: 'coaches', title: 'Coaches Section', icon: Users },
    { name: 'apparel-cta', title: 'Apparel CTA Section', icon: Component },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Landing Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link href={`/admin/landing-page/${section.name}`} key={section.name}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{section.title}</CardTitle>
                <section.icon className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Click to edit the {section.title.toLowerCase()}.</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}