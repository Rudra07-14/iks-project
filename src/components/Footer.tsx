import React from 'react';
import { Leaf } from 'lucide-react';

interface FooterProps {
  onNav: (tab: 'home' | 'assessment' | 'how-it-works' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNav }) => {
  return (
    <footer className="bg-stone-100 text-[#2D2926] pt-14 pb-10 border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#4A5D4E] text-white flex items-center justify-center shadow-sm">
                <Leaf className="w-4 h-4 text-[#FDFCF7]" />
              </div>
              <div>
                <span className="font-bold text-lg uppercase tracking-tight text-[#2D2926]">
                  Prakriti
                </span>
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                  Expert System Platform · IKS × CS
                </div>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm mb-4">
              An academic rule-based artificial intelligence system formalizing Ayurvedic constitutional assessment (Prakriti Nirupana) into deterministic IF-THEN production rules and explainable inference.
            </p>
            <div className="text-[11px] font-mono text-stone-500">
              Charaka Samhita · Sushruta Samhita · Production Rules · Forward Chaining
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => onNav('home')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNav('assessment')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  8-Question Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNav('how-it-works')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  How the Engine Thinks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNav('about')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  About & Academic Mapping
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Attribution */}
          <div className="md:col-span-4">
            <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-4">
              Academic Disclaimer
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              This project is built strictly for academic, educational, and computational research demonstration. It does not provide medical diagnoses, clinical treatments, or prescriptive remedies.
            </p>
          </div>

        </div>

        {/* Bottom Bar matching Natural Tones design */}
        <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[11px]">
          <div className="flex flex-wrap gap-8 sm:gap-12">
            <div className="flex flex-col">
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">IKS Mapping</span>
              <span className="text-stone-800 font-medium">Ayurveda → Knowledge Domain</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">CS Concept</span>
              <span className="text-stone-800 font-medium">Inference Engine → Reasoning Trace</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">Methodology</span>
              <span className="text-stone-800 font-medium">Deterministic Rule Matching</span>
            </div>
          </div>
          <div className="max-w-xs text-left sm:text-right text-stone-500 text-[10px] leading-tight">
            Educational demonstration of rule-based expert systems. Not for medical diagnostic use.
          </div>
        </div>
      </div>
    </footer>
  );
};
