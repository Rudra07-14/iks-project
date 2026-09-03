import React from 'react';
import { CheckCircle2, Database, FileCode2, Layers, SlidersHorizontal, Sparkles } from 'lucide-react';

export const SystemThinkingSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "User Observation",
      desc: "You choose answers describing physical traits, digestion, routine, and temperament.",
      category: "Input Capture",
      icon: SlidersHorizontal
    },
    {
      step: "02",
      title: "Fact Assertion",
      desc: "Your selections are converted into structured input facts in working memory.",
      category: "Working Memory",
      icon: Layers
    },
    {
      step: "03",
      title: "Knowledge Base",
      desc: "Classical Ayurvedic rules formulated from Charaka and Sushruta Samhitas are loaded.",
      category: "Domain Knowledge",
      icon: Database
    },
    {
      step: "04",
      title: "Rule Pattern Matching",
      desc: "Deterministic IF–THEN rules fire when conditions match your asserted facts.",
      category: "Inference Engine",
      icon: FileCode2
    },
    {
      step: "05",
      title: "Score Accumulation",
      desc: "Each matching rule contributes discrete points to Vata, Pitta, and Kapha counters.",
      category: "Forward Chaining",
      icon: Sparkles
    },
    {
      step: "06",
      title: "Explainable Output",
      desc: "The dominant Prakriti is identified with an exact audit trace of every rule that fired.",
      category: "Audit & Results",
      icon: CheckCircle2
    }
  ];

  return (
    <section className="py-20 bg-[#FDFCF7] border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">
            Computer Science Foundations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2926] mt-2 mb-4">
            How the Expert System Thinks
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Expert systems emulate specialized decision-making through formal production rules. Rather than using opaque neural probabilities, each conclusion is reached through a traceable chain of logic.
          </p>
        </div>

        {/* Simple Beautiful Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-400">
                      {item.step}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-[#A67C52] tracking-wide uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#2D2926] mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

