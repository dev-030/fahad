
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AddCoachPage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [achievements, setAchievements] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = '';
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const { path } = await uploadRes.json();
          imageUrl = path;
        } else {
          console.error('Failed to upload image');
          toast.error('Failed to upload image.');
          return;
        }
      }

      const response = await fetch('/api/coaches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, imageUrl, bio, specialties, achievements }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Coach added successfully.');
      router.push('/admin/coaches');
    } catch (error: any) {
      console.error('Failed to add coach:', error);
      toast.error(`Failed to add coach: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Coach</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Coach Image</label>
              <input
                id="image"
                type="file"
                ref={fileInputRef}
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
              />
              <Button type="button" onClick={() => fileInputRef.current?.click()}>
                Choose File
              </Button>
              {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div>
              <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialties (comma-separated)</label>
              <Input id="specialties" value={specialties} onChange={(e) => setSpecialties(e.target.value)} />
            </div>
            <div>
              <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Achievements (comma-separated)</label>
              <Input id="achievements" value={achievements} onChange={(e) => setAchievements(e.target.value)} />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button type="submit">Add Coach</Button>
              <Link href="/admin/coaches">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
