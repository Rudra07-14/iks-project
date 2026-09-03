import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
  onLearnMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAssessment, onLearnMore }) => {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-stone-200 bg-[#FDFCF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2D2926] leading-[1.15] mb-6">
          Discover Your Prakriti Through Rules of Ayurveda
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          Explore the traditional concept of Prakriti through an interactive rule-based expert system that connects Indian Knowledge Systems with Computer Science.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartAssessment}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-[#4A5D4E] text-white hover:bg-[#3C4C3F] transition-all shadow-sm cursor-pointer group"
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onLearnMore}
            className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors border border-stone-200 cursor-pointer"
          >
            How It Works
          </button>
        </div>

      </div>
    </section>
  );
};
