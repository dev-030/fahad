'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Pricing {
  id: string;
  name: string;
  price: number;
  features: string;
  type: string;
}

export default function EditKidsPlanPage() {
  const params = useParams();
  const { id } = params;
  const [plan, setPlan] = useState<Pricing | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchPlan = async () => {
        const res = await fetch(`/api/pricing/${id}`);
        const data = await res.json();
        setPlan(data);
        setName(data.name);
        setPrice(data.price);
        setFeatures(data.features);
      };
      fetchPlan();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/pricing/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, features, type: 'kids' }),
    });
    router.push('/admin/pricing');
  };

  if (!plan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Kids Plan: {plan.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/>
            </div>
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Features (comma-separated)</label>
              <Textarea id="features" value={features} onChange={(e) => setFeatures(e.target.value)} />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
