'use client';

import React, { useState, useEffect, useRef } from 'react';

import { OurGym } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const OurGymAdminPage = () => {
  const [ourGymData, setOurGymData] = useState<OurGym | null>(null);
  const [formState, setFormState] = useState({ title: '', content: '', imageUrl: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOurGymData = async () => {
      try {
        const response = await fetch('/api/ourgym');
        const data = await response.json();
        if (data) {
          setOurGymData(data);
          setFormState(data);
        }
      } catch (error) {
        console.error('Error fetching Our Gym data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOurGymData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedImageUrl = formState.imageUrl;

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
      const method = ourGymData ? 'PATCH' : 'POST';
      const response = await fetch('/api/ourgym', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ourGymData ? { id: ourGymData.id, ...formState, imageUrl: updatedImageUrl } : { ...formState, imageUrl: updatedImageUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to update Our Gym data');
      }

      toast.success('Our Gym data updated successfully!');
    } catch (error) {
      console.error('Error updating Our Gym data:', error);
      toast.error('Failed to update Our Gym data.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Our Gym Page</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <Input
            id="title"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <Textarea
            id="content"
            name="content"
            value={formState.content}
            onChange={handleInputChange}
            rows={10}
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
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
          {formState.imageUrl && (
            <div className="mt-2">
              <p>Current Image:</p>
              <img src={formState.imageUrl} alt="Our Gym" className="w-full max-w-md" />
            </div>
          )}
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OurGymAdminPage;
