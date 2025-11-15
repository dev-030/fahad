'use client';

import { useState, useEffect } from 'react';

interface Feature {
  text: string;
  included: boolean;
}

interface PricingTier {
  id: string;
  title: string;
  price: number;
  duration: string;
  features: Feature[];
  type: string;
  highlighted: boolean;
}

export default function PricingAdminPage() {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<PricingTier, 'id'>>({
    title: '',
    price: 0,
    duration: '',
    features: [],
    type: 'ADULTS',
    highlighted: false,
  });

  useEffect(() => {
    fetch('/api/pricing')
      .then((res) => res.json())
      .then((data) => setPricingTiers(data));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFeatureChange = (index: number, field: keyof Feature, value: string | boolean) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, { text: '', included: true }] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/pricing/${isEditing}` : '/api/pricing';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updatedTiers = await fetch('/api/pricing').then((res) => res.json());
      setPricingTiers(updatedTiers);
      setIsEditing(null);
      setFormData({
        title: '',
        price: 0,
        duration: '',
        features: [],
        type: 'ADULTS',
        highlighted: false,
      });
    }
  };

  const handleEdit = (tier: PricingTier) => {
    setIsEditing(tier.id);
    setFormData(tier);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this pricing tier?')) {
      const response = await fetch(`/api/pricing/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setPricingTiers(pricingTiers.filter((tier) => tier.id !== id));
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pricing Management</h1>

      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-bold mb-2">{isEditing ? 'Edit' : 'Add'} Pricing Tier</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="p-2 border rounded" />
          <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price" className="p-2 border rounded" />
          <input name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Duration" className="p-2 border rounded" />
          <select name="type" value={formData.type} onChange={handleInputChange} className="p-2 border rounded">
            <option value="ADULTS">Adults</option>
            <option value="KIDS">Kids</option>
          </select>
          <label className="flex items-center">
            <input type="checkbox" name="highlighted" checked={formData.highlighted} onChange={handleCheckboxChange} className="mr-2" />
            Highlighted
          </label>
        </div>

        <h3 className="text-lg font-bold mt-4">Features</h3>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={feature.text}
              onChange={(e) => handleFeatureChange(index, 'text', e.target.value)}
              placeholder="Feature text"
              className="p-2 border rounded flex-grow"
            />
            <label>
              <input
                type="checkbox"
                checked={feature.included}
                onChange={(e) => handleFeatureChange(index, 'included', e.target.checked)}
                className="mr-2"
              />
              Included
            </label>
            <button type="button" onClick={() => removeFeature(index)} className="bg-red-500 text-white p-2 rounded">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addFeature} className="bg-blue-500 text-white p-2 rounded mt-2">
          Add Feature
        </button>

        <div className="mt-4">
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            {isEditing ? 'Update' : 'Create'}
          </button>
          {isEditing && (
            <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: '', price: 0, duration: '', features: [], type: 'ADULTS', highlighted: false }); }} className="bg-gray-500 text-white p-2 rounded ml-2">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-2">Existing Pricing Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pricingTiers.map((tier) => (
            <div key={tier.id} className={`p-4 border rounded ${tier.highlighted ? 'border-red-500' : ''}`}>
              <h3 className="text-lg font-bold">{tier.title}</h3>
              <p className="text-2xl font-bold">${tier.price}</p>
              <p className="text-sm text-gray-500">{tier.duration}</p>
              <ul className="my-4">
                {Array.isArray(tier.features) && tier.features.map((feature, index) => (
                  <li key={index} className={`${feature.included ? '' : 'line-through'}`}>
                    {feature.text}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-bold">{tier.type}</p>
              <div className="mt-4">
                <button onClick={() => handleEdit(tier)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(tier.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
