'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Pencil } from "lucide-react";
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from 'sonner';

export default function UserProfile() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      fetch('/api/user')
        .then(res => res.json())
        .then(data => {
          setUsername(data.username);
        });
    }
  }, [session]);

  const handleUpdate = async () => {
    setLoading(true);
    setError('');

    if (newPassword) {
      if (!oldPassword) {
        setError("Old password is required to change password");
        setLoading(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New passwords don't match");
        setLoading(false);
        return;
      }
    }

    const body: { username: string; oldPassword?: string; newPassword?: string } = {
      username,
    };

    if (newPassword) {
      body.oldPassword = oldPassword;
      body.newPassword = newPassword;
    }

    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success('Profile updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError('Failed to update profile');
    }
    setLoading(false);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <motion.div 
      className="container mx-auto py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto bg-white/30 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent>


          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Input 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/50 dark:bg-white/10 border-gray-300 dark:border-white/20" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              Password and Security
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="old-password">Old Password</Label>
                <div className="relative">
                  <Input
                    id="old-password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="bg-white/50 dark:bg-white/10 border-gray-300 dark:border-white/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-white/50 dark:bg-white/10 border-gray-300 dark:border-white/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/50 dark:bg-white/10 border-gray-300 dark:border-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center font-semibold">{error}</p>}
          <div className="mt-8">
            <Button 
              className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Update Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
