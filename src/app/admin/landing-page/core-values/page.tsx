'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from "sonner";
import { FaPlus, FaTrash } from 'react-icons/fa';

interface CoreValue {
  id?: string;
  title: string;
  description: string;
}

const CoreValuesAdminPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [values, setValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/landing-page/core-values');
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setValues(data.values);
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleValueChange = (index: number, field: keyof CoreValue, value: string) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], [field]: value };
    setValues(newValues);
  };

  const handleAddValue = () => {
    setValues([...values, { title: '', description: '' }]);
  };

  const handleRemoveValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await fetch('/api/landing-page/core-values', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, values }),
      });

      toast.success('Core values updated successfully!');
      router.push('/admin/landing-page');
    } catch (err) {
      console.error('Failed to save data:', err);
      setError('Failed to save data.');
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
          <CardTitle>Edit Core Values</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label htmlFor="title" className="mb-2 block">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Values</h2>
              {values.map((v, index) => (
                <div key={v.id || index} className="flex space-x-4 mb-4">
                  <Input
                    placeholder="Value Title"
                    value={v.title}
                    onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Value Description"
                    value={v.description}
                    onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="destructive" onClick={() => handleRemoveValue(index)}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddValue}>
                <FaPlus className="mr-2" /> Add Value
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

export default CoreValuesAdminPage;
