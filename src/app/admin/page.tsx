'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Users,
  Calendar,
  DollarSign,
  Swords,
  Component,
} from 'lucide-react';

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const managementSections = [
    { href: '/admin/coaches', title: 'Manage Coaches', description: 'Add, edit, or remove coaches.', icon: Users },
    { href: '/admin/disciplines', title: 'Manage Disciplines', description: 'Add, edit, or remove disciplines.', icon: Swords },
    { href: '/admin/schedule', title: 'Manage Schedule', description: 'Update class schedules and events.', icon: Calendar },
    { href: '/admin/pricing', title: 'Manage Pricing', description: 'Set and adjust membership pricing.', icon: DollarSign },
    { href: '/admin/landing-page', title: 'Landing Page', description: 'Edit all sections of the landing page.', icon: Component },
    { href: '/admin/profile', title: 'Manage Profile', description: 'Edit your profile and security settings.', icon: User },
    { href: '/admin/ourgym', title: 'Manage Our Gym', description: 'Edit the content of the Our Gym page.', icon: Component },
    { href: '/admin/gym-info', title: 'Social and Adress', description: 'Edit Contact Info', icon: Component },

  ];

  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/50 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-xl shadow-lg text-gray-800 dark:text-white">
          <CardHeader>
            <CardTitle className="text-4xl font-bold tracking-tight">Admin Dashboard</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 text-lg">
              Welcome to the command center. Manage your website content with ease.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-200">
              Select a category below to get started.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementSections.map((section, i) => (
            <Link href={section.href} passHref key={i}>
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="cursor-pointer h-full"
              >
                <Card className="bg-white/30 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-lg shadow-md hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 h-full text-gray-800 dark:text-white">
                  <CardHeader className="flex-row items-center gap-4">
                    <section.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">{section.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}