import React from 'react';
import { ArrowRight, CheckCircle, Cpu, Database, GitCommit, HelpCircle, Layers, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

interface HowItWorksViewProps {
  onStartAssessment: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onStartAssessment }) => {
  const pipeline = [
    {
      step: 1,
      name: "User Input",
      csTerm: "Questionnaire Interface",
      detail: "The individual provides answers across 8 fundamental somatic and behavioral traits (body structure, appetite, activity, routine, mental nature, sleep, stress response, and weather affinity)."
    },
    {
      step: 2,
      name: "Fact Formulation",
      csTerm: "Working Memory Assertion",
      detail: "Each selected response is translated into an asserted input fact in the expert system’s working memory (e.g., FACT: Body_Structure = 'Light and thin')."
    },
    {
      step: 3,
      name: "Knowledge Base Access",
      csTerm: "Rule Base (rules.py)",
      detail: "The engine references a predefined set of classical Ayurvedic production rules codified directly from foundational treatises (Charaka & Sushruta Samhitas)."
    },
    {
      step: 4,
      name: "Rule Pattern Matching",
      csTerm: "Conditional Premise Check",
      detail: "The inference engine matches the asserted user fact against candidate IF-THEN rules, evaluating which condition is satisfied."
    },
    {
      step: 5,
      name: "Score Assignment",
      csTerm: "Consequent Action Execution",
      detail: "The fired rule executes its consequent action: it increments the matched Dosha counter by exactly +1 unit."
    },
    {
      step: 6,
      name: "Working Memory Accumulation",
      csTerm: "Evidence Synthesis",
      detail: "Scores for Vata, Pitta, and Kapha are aggregated across all 8 question steps, establishing an empirical evidence distribution."
    },
    {
      step: 7,
      name: "Final Classification",
      csTerm: "Argmax with Deterministic Precedence",
      detail: "The Dosha with the highest cumulative unit score is declared the dominant Prakriti. In the event of a tie, deterministic precedence order is applied (Vata > Pitta > Kapha)."
    },
    {
      step: 8,
      name: "Explainable Reasoning Trace",
      csTerm: "Audit & Justification Generation",
      detail: "The system outputs the step-by-step trace of which rules fired, the exact score progressions (e.g., 2 → 3), and the classical Ayurvedic rationale."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">
          Algorithmic Deep Dive
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2926] mt-2 mb-4">
          How the Expert System Works
        </h1>
        <p className="text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          An end-to-end breakdown of how traditional Ayurvedic characteristics are converted into computational facts, evaluated through a production rule base, and synthesized into an explainable classification.
        </p>
      </div>

      {/* 8 Step Pipeline Cards */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-[#2D2926] mb-8">
          The 8-Stage Forward-Chaining Inference Process
        </h2>

        <div className="space-y-4">
          {pipeline.map((item) => (
            <div
              key={item.step}
              className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 hover:bg-white hover:border-[#A67C52]/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-[#4A5D4E] text-white text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                  0{item.step}
                </span>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#2D2926]">
                      {item.name}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded w-fit">
                      {item.csTerm}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Rule-Based Systems? Card */}
      <div className="bg-stone-50 rounded-2xl p-6 sm:p-10 border border-stone-200 mb-12">
        <h2 className="text-2xl font-bold text-[#2D2926] mb-4">
          Why a Rule-Based System Instead of Machine Learning?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-600 leading-relaxed">
          <div className="bg-white p-5 rounded-xl border border-stone-200">
            <h3 className="font-bold text-[#2D2926] text-sm mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700" /> Complete Explainability
            </h3>
            <p>
              In clinical and academic Ayurvedic contexts, understanding why a decision was reached is just as vital as the decision itself. Every output is directly traceable to established shlokas and foundational rules.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200">
            <h3 className="font-bold text-[#2D2926] text-sm mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A67C52]" /> 100% Determinism
            </h3>
            <p>
              Given the identical set of 8 responses, the system will reliably generate the identical score and dominant classification every single time, with zero statistical drift, hallucination, or black-box opacity.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={onStartAssessment}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full bg-[#4A5D4E] text-white hover:bg-[#3C4C3F] transition-colors shadow-sm cursor-pointer"
        >
          <span>Try the Assessment & Observe the Rules</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
