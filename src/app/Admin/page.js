"use client";
import { useState } from 'react';
import HeaderComponents from './components/HeaderComponent';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };
  
  return (
    <>
      <HeaderComponents title="Dashboard" description="Manage your Dashboard" toggleMenu={toggleMenu} />
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* Add your Orders page content here */}
      </div>
    </>
  );
}
