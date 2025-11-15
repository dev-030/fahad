'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaDumbbell, FaBatteryFull, FaCalendarAlt, FaUserFriends, FaMedal, FaSmile, FaPlus, FaTrash } from 'react-icons/fa'; // Import all necessary icons
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from "sonner";

interface Discipline {
  id?: string;
  name: string;
  href: string;
}

interface GymFeature {
  id?: string;
  icon: string;
  text: string;
}

const iconOptions = [
  'FaDumbbell', 'FaBatteryFull', 'FaCalendarAlt', 'FaUserFriends', 'FaMedal', 'FaSmile',
  // Add more icons as needed
];

const FeaturesAdminPage = () => {
  const router = useRouter();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [gymFeatures, setGymFeatures] = useState<GymFeature[]>([]);
  const [description, setDescription] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletedDisciplineIds, setDeletedDisciplineIds] = useState<string[]>([]);
  const [deletedGymFeatureIds, setDeletedGymFeatureIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [disciplinesRes, gymFeaturesRes, descriptionRes] = await Promise.all([
          fetch('/api/landing-page/features/disciplines'),
          fetch('/api/landing-page/features/gym-features'),
          fetch('/api/landing-page/features/description'),
        ]);

        const disciplinesData = await disciplinesRes.json();
        const gymFeaturesData = await gymFeaturesRes.json();
        const descriptionData = await descriptionRes.json();

        setDisciplines(disciplinesData);
        setGymFeatures(gymFeaturesData);
        setDescription(descriptionData.description);
        setSubtitle(descriptionData.subtitle);
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDisciplineChange = (index: number, field: keyof Discipline, value: string) => {
    const newDisciplines = [...disciplines];
    newDisciplines[index] = { ...newDisciplines[index], [field]: value };
    setDisciplines(newDisciplines);
  };

  const handleAddDiscipline = () => {
    setDisciplines([...disciplines, { name: '', href: '' }]);
  };

  const handleRemoveDiscipline = (index: number) => {
    const disciplineToRemove = disciplines[index];
    if (disciplineToRemove.id) {
      setDeletedDisciplineIds([...deletedDisciplineIds, disciplineToRemove.id]);
    }
    setDisciplines(disciplines.filter((_, i) => i !== index));
  };

  const handleGymFeatureChange = (index: number, field: keyof GymFeature, value: string) => {
    const newGymFeatures = [...gymFeatures];
    newGymFeatures[index] = { ...newGymFeatures[index], [field]: value };
    setGymFeatures(newGymFeatures);
  };

  const handleAddGymFeature = () => {
    setGymFeatures([...gymFeatures, { icon: '', text: '' }]);
  };

  const handleRemoveGymFeature = (index: number) => {
    const featureToRemove = gymFeatures[index];
    if (featureToRemove.id) {
      setDeletedGymFeatureIds([...deletedGymFeatureIds, featureToRemove.id]);
    }
    setGymFeatures(gymFeatures.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Handle deletions
      await Promise.all([
        ...deletedDisciplineIds.map(id =>
          fetch('/api/landing-page/features/disciplines', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          })
        ),
        ...deletedGymFeatureIds.map(id =>
          fetch('/api/landing-page/features/gym-features', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          })
        ),
      ]);

      // Save disciplines
      await Promise.all(disciplines.map(d =>
        fetch('/api/landing-page/features/disciplines', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(d),
        })
      ));

      // Save gym features
      await Promise.all(gymFeatures.map(f =>
        fetch('/api/landing-page/features/gym-features', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(f),
        })
      ));

      // Save description and subtitle
      await fetch('/api/landing-page/features/description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, subtitle }),
      });

      toast.success('Features updated successfully!');
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
          <CardTitle>Edit Landing Page Features</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Disciplines */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Disciplines</h2>
              {disciplines.map((d, index) => (
                <div key={d.id || index} className="flex space-x-4 mb-4">
                  <Input
                    placeholder="Discipline Name"
                    value={d.name}
                    onChange={(e) => handleDisciplineChange(index, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Href"
                    value={d.href}
                    onChange={(e) => handleDisciplineChange(index, 'href', e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="destructive" onClick={() => handleRemoveDiscipline(index)}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddDiscipline}>
                <FaPlus className="mr-2" /> Add Discipline
              </Button>
            </div>

            {/* Gym Features */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Gym Features</h2>
              {gymFeatures.map((f, index) => (
                <div key={f.id || index} className="flex space-x-4 mb-4">
                  <select
                    value={f.icon}
                    onChange={(e) => handleGymFeatureChange(index, 'icon', e.target.value)}
                    className="flex-1 bg-gray-700 text-white p-2 rounded-md"
                  >
                    <option value="">Select Icon</option>
                    {iconOptions.map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                  <Input
                    placeholder="Feature Text"
                    value={f.text}
                    onChange={(e) => handleGymFeatureChange(index, 'text', e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="destructive" onClick={() => handleRemoveGymFeature(index)}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddGymFeature}>
                <FaPlus className="mr-2" /> Add Gym Feature
              </Button>
            </div>

            {/* Description and Subtitle */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <Label htmlFor="description" className="mb-2 block">Main Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-4"
                rows={10}
              />
              <Label htmlFor="subtitle" className="mb-2 block">Subtitle</Label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
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

export default FeaturesAdminPage;
