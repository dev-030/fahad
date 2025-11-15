'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Link from 'next/link';

export default function SecondHeroAdminPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSecondHeroData = async () => {
      try {
        const response = await fetch('/api/landing-page/second-hero');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data) {
          setTitle(data.title || '');
          setSubtitle(data.subtitle || '');
          setDescription(data.description || '');
          setImageUrl(data.imageUrl || '');
        }
      } catch (error) {
        console.error('Failed to fetch second hero data:', error);
      }
    };
    fetchSecondHeroData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedImageUrl = imageUrl;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (uploadRes.ok) {
        const { path } = await uploadRes.json();
        updatedImageUrl = path;
      } else {
        console.error('Failed to upload image');
        toast.error('Failed to upload image');
        return;
      }
    }

    try {
      const response = await fetch('/api/landing-page/second-hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, subtitle, description, imageUrl: updatedImageUrl }),
      });
      if (response.ok) {
        toast.success('Second hero section updated successfully!');
        router.push('/admin/landing-page');
      } else {
        console.error('Failed to update second hero data');
        toast.error('Failed to update second hero data');
      }
    } catch (error) {
      console.error('Failed to update second hero data:', error);
      toast.error('Failed to update second hero data');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Second Hero</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <Input
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
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
          {imageUrl && (
            <div className="mt-2">
              <p>Current Image:</p>
              <img src={imageUrl} alt="Second Hero" className="w-full max-w-md" />
            </div>
          )}
        </div>
        <Button type="submit">
          Save
        </Button>

      </form>
    </div>
  );
}