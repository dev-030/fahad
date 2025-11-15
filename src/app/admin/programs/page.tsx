'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Program {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function ManageProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch('/api/programs');
      const data = await res.json();
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/programs/${id}`, {
      method: 'DELETE',
    });
    setPrograms(programs.filter((program) => program.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Programs</h1>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Link href="/admin/programs/add">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Program
                    </Button>
                  </Link>
                </div>
              </div>
      <Card>
        <CardHeader>
          <CardTitle>All Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programs.map((program: Program) => (
                  <TableRow key={program.id}>
                    <TableCell>{program.name}</TableCell>
                    <TableCell>{program.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                          <Link href={`/admin/programs/${program.id}`}>
                              <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                              </Button>
                          </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(program.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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