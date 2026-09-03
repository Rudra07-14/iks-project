/**
 * Ayurvedic Prakriti Rule-Based Expert System (IKS x Computer Science)
 * Single-Page Responsive Web Application
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DoshasSection } from './components/DoshasSection';
import { SystemThinkingSection } from './components/SystemThinkingSection';
import { IksCsMapping } from './components/IksCsMapping';
import { AssessmentWizard } from './components/AssessmentWizard';
import { ResultView } from './components/ResultView';
import { HowItWorksView } from './components/HowItWorksView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { AssessmentResult } from './expert_engine';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'assessment' | 'result' | 'how-it-works' | 'about'>('home');
  const [result, setResult] = useState<AssessmentResult | null>(() => {
    try {
      const saved = localStorage.getItem('prakriti_evaluation_result');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Persist result
  useEffect(() => {
    if (result) {
      try {
        localStorage.setItem('prakriti_evaluation_result', JSON.stringify(result));
      } catch {
        // ignore
      }
    }
  }, [result]);

  const handleAssessmentComplete = (evalResult: AssessmentResult) => {
    setResult(evalResult);
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    try {
      localStorage.removeItem('prakriti_current_answers');
      localStorage.removeItem('prakriti_evaluation_result');
    } catch {
      // ignore
    }
    setResult(null);
    setActiveTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF7] text-[#2D2926] font-sans antialiased selection:bg-[#EBDDC8] selection:text-[#2D2926]">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasResult={!!result}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero
              onStartAssessment={() => {
                setActiveTab('assessment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onLearnMore={() => {
                setActiveTab('how-it-works');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <DoshasSection />

            <SystemThinkingSection />

            <IksCsMapping />

            {/* Bottom Call to Action */}
            <section className="py-20 bg-[#FDFCF7]">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">
                    Ready to Evaluate?
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2926] mt-2 mb-4">
                    Begin Your 8-Question Assessment
                  </h2>
                  <p className="text-sm text-stone-500 max-w-lg mx-auto mb-8 leading-relaxed">
                    Walk through the deterministic rule-based evaluation. Observe how your selected physical and mental characteristics fire specific production rules.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('assessment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full bg-[#4A5D4E] text-white hover:bg-[#3C4C3F] transition-all shadow-sm cursor-pointer group"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Start Step-by-Step Assessment</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'assessment' && (
          <AssessmentWizard
            onComplete={handleAssessmentComplete}
            savedAnswers={result ? result.userAnswers : {}}
          />
        )}

        {activeTab === 'result' && result && (
          <ResultView
            result={result}
            onRestart={handleRestart}
            onLearnMore={() => {
              setActiveTab('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'result' && !result && (
          <div className="max-w-md mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-bold text-[#2D2926] mb-3">
              No Assessment Result Found
            </h2>
            <p className="text-sm text-stone-500 mb-6">
              You haven’t completed an assessment session yet. Complete the 8 questions to view your rule-based analysis.
            </p>
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-6 py-2.5 rounded-full bg-[#4A5D4E] text-white text-sm font-semibold hover:bg-[#3C4C3F] transition-colors shadow-sm cursor-pointer"
            >
              Take Assessment Now →
            </button>
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksView
            onStartAssessment={() => {
              setActiveTab('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'about' && <AboutView />}
      </main>

      {/* Global Footer */}
      <Footer onNav={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
