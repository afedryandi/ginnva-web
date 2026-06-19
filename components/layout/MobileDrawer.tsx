'use client';

import Link from 'next/link';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 flex justify-between items-center border-b">
          <span className="font-bold text-lg text-slate-800">Menu</span>
          <button onClick={onClose} className="p-2 text-slate-600 hover:text-slate-900">
            {/* Icon Close (X) */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="p-5 flex flex-col gap-4">
          <Link href="/" onClick={onClose} className="text-slate-700 hover:text-primary font-medium">Home</Link>
          <Link href="/warranty" onClick={onClose} className="text-slate-700 hover:text-primary font-medium">Warranty Check</Link>
          <Link href="/services" onClick={onClose} className="text-slate-700 hover:text-primary font-medium">Services</Link>
          <Link href="/contact" onClick={onClose} className="text-slate-700 hover:text-primary font-medium">Contact</Link>
        </nav>
      </div>
    </>
  );
}