"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LoadingSpinner = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setLoading(true);
    setVisible(true);

    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setVisible(false), 500); // Corresponds to fade-out duration
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!visible || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        loading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
