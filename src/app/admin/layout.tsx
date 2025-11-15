'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Swords,
  Component,
  Menu,
  X,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/sonner";
import { signOut } from 'next-auth/react';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/coaches', label: 'Coaches', icon: Users },
    { href: '/admin/pricing', label: 'Pricing', icon: Swords },
    { href: '/admin/schedule', label: 'Schedule', icon: Calendar },
    { href: '/admin/disciplines', label: 'disciplines', icon: DollarSign },
    { href: '/admin/ourgym', label: 'Our Gym', icon: Component },
    { href: '/admin/gym-info', label: 'Gym Info', icon: Info },
   
  ];

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold tracking-wider text-gray-900 dark:text-white">Admin</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              asChild
              variant="ghost"
              className="justify-start text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Link href={item.href} className="flex items-center px-3 py-2">
                <item.icon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-wider text-gray-900 dark:text-white lg:hidden">Admin</h1>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  asChild
                  variant="ghost"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                >
                  <Link href={item.href} className="flex items-center px-3 py-2">
                    <item.icon className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-gray-100 dark:bg-gradient-to-br from-gray-950 to-gray-900">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayoutContent>{children}</AdminLayoutContent>
  );
}