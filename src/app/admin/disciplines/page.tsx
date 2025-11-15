import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PencilIcon, TrashIcon } from 'lucide-react';

import DeleteDisciplineButton from './DeleteDisciplineButton';

interface Discipline {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  title: string;
}

export default async function AdminDisciplinesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/disciplines`, { cache: 'no-store' });
  const disciplines = await res.json();

  if (!Array.isArray(disciplines)) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-red-500">Error: Failed to fetch disciplines.</h1>
        <p>The API did not return a valid list of disciplines.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Disciplines</h1>
        <Button asChild>
          <Link href="/admin/disciplines/add">Add New Discipline</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Disciplines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disciplines.map((discipline) => (
            <TableRow key={discipline.id}>
              <TableCell className="font-medium">{discipline.name}</TableCell>
              <TableCell>{discipline.slug}</TableCell>
              <TableCell>{discipline.title}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/admin/disciplines/${discipline.slug}`}>
                      <PencilIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteDisciplineButton slug={discipline.slug} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
