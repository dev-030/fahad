'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ApparelCTAAdmin() {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/apparel-cta')
      .then((res) => res.json())
      .then((data) => {
        reset(data);
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data) => {
    let updatedImageUrl = data.imageUrl;
    let updatedLogoUrl = data.logoUrl;

    if (selectedImageFile) {
      const formData = new FormData();
      formData.append('file', selectedImageFile);
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (uploadRes.ok) {
        const { path } = await uploadRes.json();
        updatedImageUrl = path;
      } else {
        toast.error('Failed to upload image');
        return;
      }
    }

    if (selectedLogoFile) {
      const formData = new FormData();
      formData.append('file', selectedLogoFile);
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (uploadRes.ok) {
        const { path } = await uploadRes.json();
        updatedLogoUrl = path;
      } else {
        toast.error('Failed to upload logo');
        return;
      }
    }

    await fetch('/api/apparel-cta', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, imageUrl: updatedImageUrl, logoUrl: updatedLogoUrl }),
    });
    toast.success('Apparel CTA updated successfully!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Apparel CTA</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          ref={imageFileInputRef}
          onChange={(e) => setSelectedImageFile(e.target.files ? e.target.files[0] : null)}
          className="hidden"
        />
        <div className="flex items-center space-x-2 mt-1">
          <Button type="button" onClick={() => imageFileInputRef.current?.click()}>
            Choose File
          </Button>
          {selectedImageFile && <span className="ml-2">{selectedImageFile.name}</span>}
        </div>
        {watch('imageUrl') && (
          <div className="mt-2">
            <p>Current Image:</p>
            <img src={watch('imageUrl')} alt="Apparel" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="logo">Logo</label>
        <input
          id="logo"
          type="file"
          ref={logoFileInputRef}
          onChange={(e) => setSelectedLogoFile(e.target.files ? e.target.files[0] : null)}
          className="hidden"
        />
        <div className="flex items-center space-x-2 mt-1">
          <Button type="button" onClick={() => logoFileInputRef.current?.click()}>
            Choose File
          </Button>
          {selectedLogoFile && <span className="ml-2">{selectedLogoFile.name}</span>}
        </div>
        {watch('logoUrl') && (
          <div className="mt-2">
            <p>Current Logo:</p>
            <img src={watch('logoUrl')} alt="Logo" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <Input id="title" {...register('title')} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Textarea id="description" {...register('description')} />
      </div>
      <div>
        <label htmlFor="buttonText">Button Text</label>
        <Input id="buttonText" {...register('buttonText')} />
      </div>
      <div>
        <label htmlFor="buttonUrl">Button URL</label>
        <Input id="buttonUrl" {...register('buttonUrl')} />
      </div>
      <Button type="submit">Save</Button>
    </form>
        </CardContent>
      </Card>
    </div>
  );
}
