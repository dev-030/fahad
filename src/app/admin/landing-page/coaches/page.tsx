'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from "sonner";
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Image from 'next/image';


interface CoachLens {
  id?: string;
  title: string;
  subtitle: string;
}

interface FormData {
  title: string;
  description: string;
  backgroundImage: string;
}

const CoachesAdminPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const [lenses, setLenses] = useState<CoachLens[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBackgroundImageFile, setSelectedBackgroundImageFile] = useState<File | null>(null);
  const backgroundImageFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/landing-page/coaches');
        const data = await res.json();
        reset({
          title: data.title,
          description: data.description,
          backgroundImage: data.backgroundImage,
        });
        setLenses(data.lenses || []);
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reset]);

  const handleLensChange = (index: number, field: keyof CoachLens, value: string) => {
    const newLenses = [...lenses];
    newLenses[index] = { ...newLenses[index], [field]: value };
    setLenses(newLenses);
  };

  const handleAddLens = () => {
    setLenses([...lenses, { title: '', subtitle: '' }]);
  };

  const handleRemoveLens = (index: number) => {
    setLenses(lenses.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    setError(null);

    let updatedBackgroundImage = data.backgroundImage;

    if (selectedBackgroundImageFile) {
      const formData = new FormData();
      formData.append('file', selectedBackgroundImageFile);
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json();
          throw new Error(errorData.error || 'Failed to upload background image');
        }

        const uploadResult = await uploadRes.json();
        updatedBackgroundImage = uploadResult.path;
        toast.success('Background image uploaded successfully!');
      } catch (uploadError: any) {
        console.error('Upload error:', uploadError);
        setError(`Failed to upload background image: ${uploadError.message}`);
        toast.error(`Failed to upload background image: ${uploadError.message}`);
        setSaving(false);
        return;
      }
    }

    try {
      await fetch('/api/landing-page/coaches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          backgroundImage: updatedBackgroundImage,
          lenses: lenses,
        }),
      });

      toast.success('Coaches section updated successfully!');
      router.push('/admin/landing-page');
    } catch (err: any) {
      console.error('Failed to save data:', err);
      setError(`Failed to save data: ${err.message}`);
      toast.error(`Failed to save data: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-8 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Coaches Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <Label htmlFor="title" className="mb-2 block">Title</Label>
              <Input
                id="title"
                {...register('title')}
              />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="backgroundImage" className="mb-2 block">Background Image</Label>
              <input
                id="backgroundImage"
                type="file"
                ref={backgroundImageFileInputRef}
                onChange={(e) => setSelectedBackgroundImageFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
              />
              <Button type="button" onClick={() => backgroundImageFileInputRef.current?.click()}>
                Choose File
              </Button>
              {selectedBackgroundImageFile && <span className="ml-2">{selectedBackgroundImageFile.name}</span>}
              {watch('backgroundImage') && (
                <div className="mt-2">
                  <p>Current Background Image:</p>
                  <Image
                    src={watch('backgroundImage')}
                    alt="Background"
                    width={200}
                    height={100}
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Lenses</h2>
              {lenses.map((lens, index) => (
                <div key={lens.id || index} className="flex space-x-4 mb-4">
                  <Input
                    placeholder="Lens Title"
                    value={lens.title}
                    onChange={(e) => handleLensChange(index, 'title', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Lens Subtitle"
                    value={lens.subtitle}
                    onChange={(e) => handleLensChange(index, 'subtitle', e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="destructive" onClick={() => handleRemoveLens(index)}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddLens}>
                <FaPlus className="mr-2" /> Add Lens
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Link href="/admin/landing-page">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesAdminPage;