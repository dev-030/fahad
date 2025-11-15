'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

interface Schedule {
  id: string;
  day: string;
  time: string;
  program: string;
  level: string;
  type: string;
}

export default function ManageSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [scheduleToDeleteId, setScheduleToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await fetch('/api/schedule');
      const data = await res.json();
      setSchedules(data);
    };
    fetchSchedules();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/schedule/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSchedules(schedules.filter((schedule) => schedule.id !== id));
      toast.success('Schedule event deleted successfully.');
    } catch (error: any) {
      console.error('Failed to delete schedule event:', error);
      toast.error(`Failed to delete schedule event: ${error.message}`);
    } finally {
      setIsDeleteDialogOpen(false);
      setScheduleToDeleteId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setScheduleToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleFileUpload = async (fileToUpload: File) => {
    const formData = new FormData();
    formData.append('file', fileToUpload);

    const response = await fetch('/api/schedule-pdf', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Schedule PDF updated successfully!');
    } else {
      alert('Failed to upload schedule PDF.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      handleFileUpload(file);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Schedule</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Link href="/admin/schedule/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Event
            </Button>
          </Link>
        </div>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Schedule PDF Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <input id="file" name="file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
              <div className="flex items-center space-x-2 mt-1">
                <Button type="button" onClick={() => document.getElementById('file')?.click()}>
                  Upload File
                </Button>
                <span className="text-gray-500">{selectedFile ? selectedFile.name : 'No file chosen'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <Table class="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule: Schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{schedule.day}</TableCell>
                    <TableCell>{schedule.time}</TableCell>
                    <TableCell>{schedule.program}</TableCell>
                    <TableCell>{schedule.level}</TableCell>
                    <TableCell>{schedule.type}</TableCell>
                    <TableCell>
                      <div class="flex items-center space-x-2">
                          <Link href={`/admin/schedule/${schedule.id}`}>
                              <Button variant="outline" size="icon">
                                  <Edit class="h-4 w-4" />
                              </Button>
                          </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(schedule.id)}>
                          <Trash2 class="h-4 w-4" />
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this schedule event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => scheduleToDeleteId && handleDelete(scheduleToDeleteId)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}