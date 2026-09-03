import React from 'react';
import { Wind, Flame, Mountain } from 'lucide-react';
import { DOSHA_METADATA } from '../rules';

export const DoshasSection: React.FC = () => {
  const doshaIcons = {
    Vata: Wind,
    Pitta: Flame,
    Kapha: Mountain,
  };

  return (
    <section id="doshas-section" className="py-20 bg-[#F7F5EE] border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">
            Ayurvedic Foundations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2926] mt-2 mb-4">
            The Three Biological Energies (Tridosha)
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            In classical Ayurveda, Prakriti refers to an individual’s innate constitutional blueprint, determined by the relative predominance of three primary functional energies: Vata, Pitta, and Kapha.
          </p>
        </div>

        {/* 3 Simple Beautiful Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* VATA */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200">
                  Air & Space
                </span>
              </div>

              <div className="mb-2">
                <span className="text-xs font-medium text-[#A67C52]">
                  {DOSHA_METADATA.Vata.sanskrit}
                </span>
                <h3 className="text-2xl font-bold text-[#2D2926] mt-0.5">
                  Vata
                </h3>
                <p className="text-xs font-medium text-stone-500">
                  Principle of Movement
                </p>
              </div>

              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                {DOSHA_METADATA.Vata.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-2">
              <div>
                <span className="font-semibold text-stone-800">Primary Qualities:</span> {DOSHA_METADATA.Vata.qualities}
              </div>
              <div>
                <span className="font-semibold text-stone-800">Key Tendencies:</span> Slender build, quick reflexes, irregular appetite, and creative thought.
              </div>
            </div>
          </div>

          {/* PITTA */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200">
                  Fire & Water
                </span>
              </div>

              <div className="mb-2">
                <span className="text-xs font-medium text-[#A67C52]">
                  {DOSHA_METADATA.Pitta.sanskrit}
                </span>
                <h3 className="text-2xl font-bold text-[#2D2926] mt-0.5">
                  Pitta
                </h3>
                <p className="text-xs font-medium text-stone-500">
                  Principle of Transformation
                </p>
              </div>

              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                {DOSHA_METADATA.Pitta.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-2">
              <div>
                <span className="font-semibold text-stone-800">Primary Qualities:</span> {DOSHA_METADATA.Pitta.qualities}
              </div>
              <div>
                <span className="font-semibold text-stone-800">Key Tendencies:</span> Medium build, sharp appetite, structured routines, and decisive intellect.
              </div>
            </div>
          </div>

          {/* KAPHA */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                  <Mountain className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200">
                  Earth & Water
                </span>
              </div>

              <div className="mb-2">
                <span className="text-xs font-medium text-[#A67C52]">
                  {DOSHA_METADATA.Kapha.sanskrit}
                </span>
                <h3 className="text-2xl font-bold text-[#2D2926] mt-0.5">
                  Kapha
                </h3>
                <p className="text-xs font-medium text-stone-500">
                  Principle of Stability
                </p>
              </div>

              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                {DOSHA_METADATA.Kapha.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-2">
              <div>
                <span className="font-semibold text-stone-800">Primary Qualities:</span> {DOSHA_METADATA.Kapha.qualities}
              </div>
              <div>
                <span className="font-semibold text-stone-800">Key Tendencies:</span> Broad build, calm endurance, steady digestion, and methodical memory.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
