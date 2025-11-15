'use client';

import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DeleteDisciplineButton({ slug }: { slug: string }) {
  const router = useRouter();

  const onDelete = async () => {
    if (!confirm('Are you sure you want to delete this discipline?')) {
      return;
    }
    try {
      const response = await fetch(`/api/disciplines/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Discipline deleted successfully.');
      router.refresh();
    } catch (e: any) {
      toast.error(`Failed to delete discipline: ${e.message}`);
    }
  };

  return (
    <Button variant="destructive" size="icon" onClick={onDelete}>
      <TrashIcon className="h-4 w-4" />
    </Button>
  );
}
