import React, { useState } from 'react';
import { ArrowRight, BookMarked, Cpu, Sparkles } from 'lucide-react';

export const IksCsMapping: React.FC = () => {
  const [selectedMapping, setSelectedMapping] = useState<number | null>(null);

  const mappings = [
    {
      iks: "Ayurveda",
      cs: "Knowledge Domain",
      sanskrit: "आयुर्वेद",
      explanation: "The overarching domain defining physiological laws, elemental balances, and health principles."
    },
    {
      iks: "Prakriti Assessment",
      cs: "Input Collection",
      sanskrit: "प्रकृति परीक्षण",
      explanation: "User interface gathering individual responses across somatic, metabolic, and behavioral queries."
    },
    {
      iks: "Ayurvedic Characteristics",
      cs: "Asserted Facts (Working Memory)",
      sanskrit: "दोष लक्षण",
      explanation: "Specific physical or mental attributes asserted into working memory as ground truth for evaluation."
    },
    {
      iks: "Ayurvedic Classical Principles",
      cs: "Knowledge Base",
      sanskrit: "सिद्धान्त ज्ञान",
      explanation: "The compiled corpus of domain logic (rules.py) codified from classical treatises like Charaka Samhita."
    },
    {
      iks: "Classification Principles",
      cs: "IF-THEN Production Rules",
      sanskrit: "निदान नियम",
      explanation: "Explicit rules: IF (condition matches Ayurvedic characteristic) THEN (increment targeted category)."
    },
    {
      iks: "Characteristic Interpretation",
      cs: "Rule Evaluation & Firing",
      sanskrit: "लक्षण विमर्श",
      explanation: "The inference engine identifying which rule premise is satisfied by the asserted input fact."
    },
    {
      iks: "Vata / Pitta / Kapha",
      cs: "Classification Categories",
      sanskrit: "त्रिदोष",
      explanation: "The three target classification classes among which the system partitions individual constitution."
    },
    {
      iks: "Prakriti Analysis",
      cs: "Inference Engine Process",
      sanskrit: "प्रकृति विचार",
      explanation: "Forward-chaining score calculation algorithm accumulating evidence across all 8 question steps."
    },
    {
      iks: "Dominant Dosha",
      cs: "Classification Output",
      sanskrit: "प्रधान दोष",
      explanation: "The category obtaining the highest cumulative score (or resolved via deterministic tie resolution)."
    },
    {
      iks: "Ayurvedic Rationale",
      cs: "Explainable Reasoning",
      sanskrit: "युक्ति प्रमाण",
      explanation: "Complete execution audit trail explaining why each rule fired and how the final result was reached."
    }
  ];

  return (
    <section className="py-20 bg-[#FDFCF7] border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-600 mb-4">
            Academic Project Thesis
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2926] mb-4">
            IKS × Computer Science Formal Mapping
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            This collegiate project formalizes traditional Ayurvedic knowledge into computer science structures, bridging ancient Indian Knowledge Systems with formal Artificial Intelligence expert systems.
          </p>
        </div>

        {/* Side-by-side Table with Interactive Exploration */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-2 bg-stone-100 text-xs font-bold uppercase tracking-wider text-stone-700 py-3.5 px-6 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-[#A67C52]" />
              <span>Ayurveda / IKS Domain</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-stone-600" />
              <span>Computer Science Equivalent</span>
            </div>
          </div>

          <div className="divide-y divide-stone-200 text-sm">
            {mappings.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedMapping(selectedMapping === idx ? null : idx)}
                className={`grid grid-cols-2 py-3.5 px-6 transition-colors cursor-pointer select-none ${
                  selectedMapping === idx ? 'bg-stone-50' : 'hover:bg-stone-50/60'
                }`}
              >
                <div>
                  <div className="font-semibold text-[#2D2926] flex items-center gap-2">
                    <span>{item.iks}</span>
                    <span className="text-xs text-[#A67C52] hidden sm:inline">
                      ({item.sanskrit})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-stone-700">
                    {item.cs}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {selectedMapping === idx ? '▲' : '▼'}
                  </span>
                </div>

                {selectedMapping === idx && (
                  <div className="col-span-2 mt-2 pt-2 border-t border-stone-200 text-xs text-stone-600 font-sans">
                    <strong className="text-[#2D2926]">Academic Mapping:</strong> {item.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conceptual Hierarchy Flowchart */}
        <div className="bg-stone-50 rounded-2xl p-8 sm:p-10 border border-stone-200 shadow-sm text-center">
          <h3 className="text-2xl font-bold text-[#2D2926] mb-3">
            Conceptual Hierarchy: Philosophy to Algorithm
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto mb-8">
            Click to visualize how high-level traditional wisdom is transformed into rigorous computable production rules.
          </p>

          <div className="flex flex-col items-center space-y-2 text-xs font-semibold max-w-sm mx-auto">
            <div className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 text-[#2D2926] shadow-xs">
              IKS Concept (Indian Knowledge Systems)
            </div>
            <div className="text-stone-400">↓</div>
            <div className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 text-[#2D2926] shadow-xs">
              Ayurveda (Traditional Medicine & Science)
            </div>
            <div className="text-stone-400">↓</div>
            <div className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 text-[#2D2926] shadow-xs">
              Prakriti (Constitutional Classification)
            </div>
            <div className="text-stone-400">↓</div>
            <div className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 text-[#2D2926] shadow-xs">
              Three Doshas (Vata, Pitta, Kapha)
            </div>
            <div className="text-stone-400">↓</div>
            <div className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 text-[#2D2926] shadow-xs">
              Observed Characteristics (Lakshanas)
            </div>
            <div className="text-stone-400">↓</div>
            <div className="w-full py-2.5 px-4 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 font-mono shadow-xs">
              Asserted Computational Facts
            </div>
            <div className="text-stone-400">↓</div>
            <div className="w-full py-2.5 px-4 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 font-mono shadow-xs">
              IF-THEN Production Rules (rules.py)
            </div>
            <div className="text-stone-400">↓</div>
            <div className="w-full py-2.5 px-4 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 font-mono shadow-xs">
              Inference Engine (expert_engine.py)
            </div>
            <div className="text-stone-400">↓</div>
            <div className="w-full py-2.5 px-4 rounded-xl bg-[#4A5D4E] text-white font-mono shadow-sm">
              Dominant Dosha Classification
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
