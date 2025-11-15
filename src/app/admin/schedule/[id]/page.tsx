

'use client';
import { parse, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EditSchedulePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [day, setDay] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [program, setProgram] = useState('');
  const [level, setLevel] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (id) {
      const fetchSchedule = async () => {
        const res = await fetch(`/api/schedule/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch schedule');
        }
        const data = await res.json();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = days.indexOf(data.day);
        const today = new Date();
        const resultDate = new Date(today.setDate(today.getDate() - today.getDay() + dayIndex));
        setDay(resultDate);
        const parsedTime = parse(data.time, 'hh:mm a', new Date());
        const time24 = format(parsedTime, 'HH:mm');
        setTime(time24);
        setProgram(data.program);
        setLevel(data.level);
        setType(data.type);
      };
      fetchSchedule();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTime = parse(time, 'HH:mm', new Date());
    const time12 = format(parsedTime, 'hh:mm a');
    await fetch(`/api/schedule/${id}`,
     {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ day: day ? format(day, 'EEEE') : '', time: time12, program, level, type }),
    });
    router.push('/admin/schedule');
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="day">Day</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !day && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {day ? format(day, "PPP") : <span>Pick a day</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={day}
                      onSelect={setDay}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="program">Program</Label>
                <Input id="program" value={program} onChange={(e) => setProgram(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Input id="level" value={level} onChange={(e) => setLevel(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Input id="type" value={type} onChange={(e) => setType(e.target.value)} />
              </div>
              <Button type="submit">Update Event</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}