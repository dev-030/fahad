'use client';

import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function IntroHeroAdminPage() {
  const [heroText, setHeroText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchIntroHero = async () => {
      const res = await fetch('/api/landing-page/intro-hero');
      if (res.ok) {
        const data = await res.json();
        const content = JSON.parse(data.content);
        setHeroText(content.heroText);
        setVideoUrl(content.videoUrl);
      }
    };
    fetchIntroHero();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedVideoUrl = videoUrl;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (uploadRes.ok) {
        const { path } = await uploadRes.json();
        updatedVideoUrl = path;
      } else {
        console.error('Failed to upload video');
        toast.error('Failed to upload video');
        return;
      }
    }

    const res = await fetch('/api/landing-page/intro-hero', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ heroText, videoUrl: updatedVideoUrl }),
    });

    if (res.ok) {
      toast.success("Intro Hero section updated successfully!");
      router.push('/admin/landing-page');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Intro Hero</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="heroText" className="block text-sm font-medium">Hero Text</label>
              <Input id="heroText" value={heroText} onChange={(e) => setHeroText(e.target.value)} />
            </div>
            <div>
              <label htmlFor="video" className="block text-sm font-medium">Video</label>
              <input
                id="video"
                type="file"
                ref={fileInputRef}
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
              />
              <Button type="button" onClick={() => fileInputRef.current?.click()}>
                Choose File
              </Button>
              {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
              {videoUrl && (
                <div className="mt-2">
                  <p>Current Video:</p>
                  <video src={videoUrl} controls className="w-full max-w-md" />
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <Button type="submit">Save Changes</Button>
              <Link href="/admin/landing-page">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}