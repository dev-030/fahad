'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Helper component for Intro Section Form
const IntroSectionForm = ({ initialData, onSubmit }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="heroText">Landing Page Hero Text</Label>
        <Input id="heroText" name="heroText" value={data.heroText || ''} onChange={handleChange} className="text-black" />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

// Helper component for Features Section Form
const FeaturesForm = ({ initialData, onSubmit }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleDisciplineChange = (index, e) => {
    const { name, value } = e.target;
    const newDisciplines = [...data.disciplines];
    newDisciplines[index] = { ...newDisciplines[index], [name]: value };
    setData(prev => ({ ...prev, disciplines: newDisciplines }));
  };

  const addDiscipline = () => {
    setData(prev => ({ ...prev, disciplines: [...prev.disciplines, { name: '', href: '' }] }));
  };

  const removeDiscipline = (index) => {
    const newDisciplines = data.disciplines.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, disciplines: newDisciplines }));
  };

  const handleGymFeatureChange = (index, e) => {
    const newGymFeatures = [...data.gymFeatures];
    newGymFeatures[index] = e.target.value;
    setData(prev => ({ ...prev, gymFeatures: newGymFeatures }));
  };

  const addGymFeature = () => {
    setData(prev => ({ ...prev, gymFeatures: [...prev.gymFeatures, ''] }));
  };

  const removeGymFeature = (index) => {
    const newGymFeatures = data.gymFeatures.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, gymFeatures: newGymFeatures }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={data.description || ''} onChange={handleChange} rows={5} className="text-black" />
      </div>
      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" name="subtitle" value={data.subtitle || ''} onChange={handleChange} className="text-black" />
      </div>

      <h3 className="text-lg font-semibold mt-6">Disciplines</h3>
      {data.disciplines.map((discipline, index) => (
        <div key={index} className="flex space-x-2 items-end">
          <div className="flex-grow">
            <Label htmlFor={`discipline-name-${index}`}>Name</Label>
            <Input
              id={`discipline-name-${index}`}
              name="name"
              value={discipline.name}
              onChange={(e) => handleDisciplineChange(index, e)}
              className="text-black"
            />
          </div>
          <div className="flex-grow">
            <Label htmlFor={`discipline-href-${index}`}>Href</Label>
            <Input
              id={`discipline-href-${index}`}
              name="href"
              value={discipline.href}
              onChange={(e) => handleDisciplineChange(index, e)}
              className="text-black"
            />
          </div>
          <Button type="button" variant="destructive" onClick={() => removeDiscipline(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addDiscipline}>Add Discipline</Button>

      <h3 className="text-lg font-semibold mt-6">Gym Features</h3>
      {data.gymFeatures.map((feature, index) => (
        <div key={index} className="flex space-x-2 items-end">
          <div className="flex-grow">
            <Label htmlFor={`gym-feature-${index}`}>Feature</Label>
            <Input
              id={`gym-feature-${index}`}
              value={feature}
              onChange={(e) => handleGymFeatureChange(index, e)}
              className="text-black"
            />
          </div>
          <Button type="button" variant="destructive" onClick={() => removeGymFeature(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addGymFeature}>Add Gym Feature</Button>

      <Button type="submit" className="mt-4">Save Changes</Button>
    </form>
  );
};

// Helper component for Second Hero Section Form
const SecondHeroSectionForm = ({ initialData, onSubmit }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" name="imageUrl" value={data.imageUrl || ''} onChange={handleChange} className="text-black" />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={data.title || ''} onChange={handleChange} className="text-black" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={data.description || ''} onChange={handleChange} rows={5} className="text-black" />
      </div>
      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" name="subtitle" value={data.subtitle || ''} onChange={handleChange} className="text-black" />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

// Helper component for Core Values Section Form
const CoreValuesForm = ({ initialData, onSubmit }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleValueChange = (index, e) => {
    const { name, value } = e.target;
    const newValues = [...data.values];
    newValues[index] = { ...newValues[index], [name]: value };
    setData(prev => ({ ...prev, values: newValues }));
  };

  const addValue = () => {
    setData(prev => ({ ...prev, values: [...prev.values, { title: '', description: '' }] }));
  };

  const removeValue = (index) => {
    const newValues = data.values.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, values: newValues }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={data.title || ''} onChange={handleChange} className="text-black" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={data.description || ''} onChange={handleChange} rows={5} className="text-black" />
      </div>

      <h3 className="text-lg font-semibold mt-6">Values</h3>
      {data.values.map((value, index) => (
        <div key={index} className="flex space-x-2 items-end">
          <div className="flex-grow">
            <Label htmlFor={`value-title-${index}`}>Title</Label>
            <Input
              id={`value-title-${index}`}
              name="title"
              value={value.title}
              onChange={(e) => handleValueChange(index, e)}
              className="text-black"
            />
          </div>
          <div className="flex-grow">
            <Label htmlFor={`value-description-${index}`}>Description</Label>
            <Textarea
              id={`value-description-${index}`}
              name="description"
              value={value.description}
              onChange={(e) => handleValueChange(index, e)}
              rows={3}
              className="text-black"
            />
          </div>
          <Button type="button" variant="destructive" onClick={() => removeValue(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addValue}>Add Value</Button>

      <Button type="submit" className="mt-4">Save Changes</Button>
    </form>
  );
};

export default function EditLandingPageSection() {
  const params = useParams();
  const router = useRouter();
  const name = params.name as string;
  const [initialContent, setInitialContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (name) {
      const fetchSectionData = async () => {
        try {
          const response = await fetch(`/api/landing-page/${name}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch section data: ${response.statusText}`);
          }
          const data = await response.json();
          setInitialContent(JSON.parse(data.content));
        } catch (err: any) {
          setError(err.message);
          toast.error(`Error: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchSectionData();
    }
  }, [name]);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/landing-page/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: JSON.stringify(formData) }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update section: ${response.statusText}`);
      }

      toast.success('Section updated successfully!');
      router.push('/admin/landing-page');
    } catch (err: any) {
      setError(err.message);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-10 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-red-500">Error: {error}</div>;
  }

  const renderForm = () => {
    switch (name) {
      case 'intro-hero':
        return <IntroSectionForm initialData={initialContent} onSubmit={handleFormSubmit} />;
      case 'second-hero':
        return <SecondHeroSectionForm initialData={initialContent} onSubmit={handleFormSubmit} />;
      case 'features':
        return <FeaturesForm initialData={initialContent} onSubmit={handleFormSubmit} />;
      case 'core-values':
        return <CoreValuesForm initialData={initialContent} onSubmit={handleFormSubmit} />;
      default:
        return <p>No specific form for this section. Raw JSON editing is not supported for safety.</p>;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit {name.replace(/-/g, ' ').toUpperCase()} Section</CardTitle>
        </CardHeader>
        <CardContent>
          {initialContent && renderForm()}
        </CardContent>
      </Card>
    </div>
  );
}