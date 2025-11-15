
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

interface Coach {
  id: string;
  name: string;
  specialties: string[];
  imageUrl: string;
  bio: string;
}

export default function ManageCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [coachToDeleteId, setCoachToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      const res = await fetch('/api/coaches');
      const data = await res.json();
      setCoaches(data);
    };
    fetchCoaches();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/coaches/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCoaches(coaches.filter((coach) => coach.id !== id));
      toast.success('Coach deleted successfully.');
    } catch (error: any) {
      console.error('Failed to delete coach:', error);
      toast.error(`Failed to delete coach: ${error.message}`);
    } finally {
      setIsDeleteDialogOpen(false);
      setCoachToDeleteId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setCoachToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Coaches</h1>
        <Link href="/admin/coaches/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Coach
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coaches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.map((coach: Coach) => (
              <Card key={coach.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{coach.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/coaches/${coach.id}`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(coach.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {console.log('Coach Image URL:', coach.imageUrl)}
                  <img src={coach.imageUrl} alt={coach.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <p className="text-sm text-gray-500">{coach.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {coach.specialties.map(spec => (
                        <span key={spec} className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {spec}
                        </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this coach? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => coachToDeleteId && handleDelete(coachToDeleteId)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
