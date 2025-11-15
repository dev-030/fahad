'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { FaPlus, FaTrash } from 'react-icons/fa';

const lensSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
});

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  slug: z.string().min(1, { message: 'Slug is required.' }),
  imageUrl: z.string().min(1, { message: 'Image is required.' }),
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  lenses: z.array(lensSchema),
});

type DisciplineFormValues = z.infer<typeof formSchema>;

export default function AdminDisciplineFormPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = params;
  const isEdit = slug !== 'add';
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<DisciplineFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      imageUrl: '',
      title: '',
      description: '',
      lenses: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lenses",
  });

  useEffect(() => {
    if (isEdit) {
      const fetchDiscipline = async () => {
        try {
          const response = await fetch(`/api/disciplines/${slug}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          form.reset({
            name: data.name,
            slug: data.slug,
            imageUrl: data.imageUrl,
            title: data.title,
            description: data.description,
            lenses: JSON.parse(data.lenses),
          });
        } catch (e: any) {
          toast.error(`Failed to load discipline: ${e.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchDiscipline();
    } else {
      setLoading(false);
    }

    // Explicitly validate imageUrl if in add mode and no file is selected
    if (!isEdit && !selectedFile) {
      form.setError('imageUrl', { type: 'manual', message: 'Image is required for new disciplines.' });
    } else {
      form.clearErrors('imageUrl');
    }
  }, [slug, isEdit, form, selectedFile]);

  const onSubmit = async (values: DisciplineFormValues) => {
    try {
      let updatedImageUrl = values.imageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const { path } = await uploadRes.json();
          updatedImageUrl = path;
        } else {
          console.error('Failed to upload image');
          toast.error('Failed to upload image');
          return;
        }
      }

      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `/api/disciplines/${slug}` : '/api/disciplines';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, imageUrl: updatedImageUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success(`Discipline ${isEdit ? 'updated' : 'created'} successfully.`);
      router.push('/admin/disciplines');
      router.refresh();
    } catch (e: any) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} discipline: ${e.message}`);
    }
  };

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
      router.push('/admin/disciplines');
      router.refresh();
    } catch (e: any) {
      toast.error(`Failed to delete discipline: ${e.message}`);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-10 text-center">Loading form...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{isEdit ? 'Edit Discipline' : 'Add New Discipline'}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Discipline Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="discipline-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discipline Image</FormLabel>
                <FormControl>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => {
                        setSelectedFile(e.target.files ? e.target.files[0] : null);
                        field.onChange(e.target.files ? e.target.files[0].name : ''); // Update react-hook-form's value
                      }}
                      className="hidden"
                    />
                    <Button type="button" onClick={() => fileInputRef.current?.click()}>
                      Choose File
                    </Button>
                    {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
                    {form.watch('imageUrl') && (
                      <div className="mt-2">
                        <p>Current Image:</p>
                        <img src={form.watch('imageUrl')} alt="Discipline" className="w-32 h-32 object-cover rounded-md" />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="The Art of Discipline" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Detailed description of the discipline" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Lenses</h2>
            {fields.map((item, index) => (
              <div key={item.id} className="flex space-x-4 mb-4">
                <FormField
                  control={form.control}
                  name={`lenses.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Lens Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Lens Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`lenses.${index}.content`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Lens Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Lens Content" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => append({ title: '', content: '' })}>
              <FaPlus className="mr-2" /> Add Lens
            </Button>
          </div>

          <div className="flex space-x-4">
            <Button type="submit">{isEdit ? 'Save Changes' : 'Create Discipline'}</Button>
            {isEdit && (
              <Button type="button" variant="destructive" onClick={onDelete}>
                Delete Discipline
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}