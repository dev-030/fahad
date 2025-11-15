'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { CgMenu, CgClose } from 'react-icons/cg';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={` ${isAdminPage && "hidden" }fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'
        } ${
          !isScrolled && !isMenuOpen ? 'hidden' : ''
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-widest text-white">
            WARRIOR
          </Link>
          <nav className="hidden md:flex items-center space-x-6 uppercase text-sm font-bold">
            <Link href="/ourgym" className="hover:text-red-600 text-white">
              Our Gym
            </Link>
            <Link href="/disciplines" className="hover:text-red-600 text-white">
              Disciplines
            </Link>
            <Link href="/coaches" className="hover:text-red-600 text-white">
              Coaches
            </Link>
            <Link href="/schedule" className="hover:text-red-600 text-white">
              Schedule
            </Link>
            <Link href="/membership" className="hover:text-red-600 text-white">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2 border border-gray-600 hover:bg-gray-800 text-white hidden sm:block"><FaInstagram /></a>
            <a href="#" className="p-2 border border-gray-600 hover:bg-gray-800 text-white hidden sm:block"><FaFacebookF /></a>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-white text-2xl"
              aria-label="Open menu"
            >
              <CgMenu />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-black text-white transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'transform-none' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 h-full flex flex-col">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-black tracking-widest text-white">
              WARRIOR
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-3xl"
              aria-label="Close menu"
            >
              <CgClose />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center space-y-8 text-center uppercase text-2xl font-bold">
            <Link href="/about" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>
              Our Gym
            </Link>
            <Link href="/disciplines" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>
              Disciplines
            </Link>
            <Link href="/coaches" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>
              Coaches
            </Link>
            <Link href="/schedule" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>
              Schedule
            </Link>
            <Link href="/membership" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
          </nav>
          <div className="py-8 flex justify-center space-x-6">
            <a href="#" className="p-3 border border-gray-600 hover:bg-gray-800 text-white"><FaInstagram /></a>
            <a href="#" className="p-3 border border-gray-600 hover:bg-gray-800 text-white"><FaFacebookF /></a>
          </div>
        </div>
      </div>

      {/* Menu button on landing page */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className={`fixed top-4 right-4 z-50 text-white text-sm font-bold uppercase tracking-widest px-6 py-2 border border-white rounded-full transition-opacity duration-300 ${
          isScrolled || isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Open menu"
      >
        Menu
      </button>
    </>
  );
};

export default Navbar;