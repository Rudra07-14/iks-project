import React, { useState } from 'react';
import { Menu, X, ArrowRight, BookOpen, Compass, Cpu, Sparkles, Leaf } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'assessment' | 'result' | 'how-it-works' | 'about';
  setActiveTab: (tab: 'home' | 'assessment' | 'result' | 'how-it-works' | 'about') => void;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  hasResult,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'home' | 'assessment' | 'result' | 'how-it-works' | 'about') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#FDFCF7]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
            aria-label="Prakriti Expert System Home"
          >
            <div className="w-10 h-10 bg-[#4A5D4E] text-white rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
              <Leaf className="w-5 h-5 text-[#FDFCF7]" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight uppercase text-[#2D2926] leading-none">
                Prakriti
              </div>
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">
                Expert System Platform
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNav('home')}
              className={`transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'text-stone-900 border-b-2 border-[#A67C52] pb-1 font-semibold'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('how-it-works')}
              className={`transition-colors cursor-pointer ${
                activeTab === 'how-it-works'
                  ? 'text-stone-900 border-b-2 border-[#A67C52] pb-1 font-semibold'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => {
                if (activeTab !== 'home') {
                  setActiveTab('home');
                  setTimeout(() => {
                    document.getElementById('doshas-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('doshas-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              The Doshas
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`transition-colors cursor-pointer ${
                activeTab === 'about'
                  ? 'text-stone-900 border-b-2 border-[#A67C52] pb-1 font-semibold'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              About & IKS
            </button>
            {hasResult && (
              <button
                onClick={() => handleNav('result')}
                className={`transition-colors cursor-pointer ${
                  activeTab === 'result'
                    ? 'text-stone-900 border-b-2 border-[#A67C52] pb-1 font-semibold'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                My Result
              </button>
            )}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav('assessment')}
              className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full text-sm font-semibold bg-[#4A5D4E] text-white hover:bg-[#3C4C3F] transition-all shadow-sm cursor-pointer"
            >
              <span>{hasResult ? 'Retake Assessment' : 'Start New Assessment'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FDFCF7] border-b border-stone-200 px-4 py-4 space-y-3 shadow-lg">
            <button
              onClick={() => handleNav('home')}
              className="w-full text-left py-2 text-sm font-medium text-stone-800 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-stone-400" /> Home Overview
            </button>
            <button
              onClick={() => handleNav('how-it-works')}
              className="w-full text-left py-2 text-sm font-medium text-stone-800 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-stone-400" /> How the Engine Thinks
            </button>
            <button
              onClick={() => handleNav('about')}
              className="w-full text-left py-2 text-sm font-medium text-stone-800 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-stone-400" /> About Project & IKS Mapping
            </button>
            {hasResult && (
              <button
                onClick={() => handleNav('result')}
                className="w-full text-left py-2 text-sm font-medium text-[#A67C52] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#A67C52]" /> View Current Result
              </button>
            )}
            <div className="pt-2">
              <button
                onClick={() => handleNav('assessment')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#4A5D4E] text-white text-sm font-semibold hover:bg-[#3C4C3F]"
              >
                <span>{hasResult ? 'Retake Assessment' : 'Start 8-Question Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
