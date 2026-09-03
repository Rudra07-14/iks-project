import React, { useState } from 'react';
import { BookOpen, Cpu, Award, ChevronDown, ChevronUp } from 'lucide-react';

export const AboutView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const vivaQuestions = [
    {
      q: "What is an Expert System in Computer Science?",
      a: "An expert system is an artificial intelligence program designed to emulate the decision-making ability of a human expert. It consists of two primary modules: a Knowledge Base (containing domain knowledge represented as IF-THEN production rules) and an Inference Engine (which applies rules to asserted facts using forward or backward chaining)."
    },
    {
      q: "Why is this project considered an Indian Knowledge Systems (IKS) project?",
      a: "Ayurveda is a foundational Indian knowledge discipline that dates back over two millennia. This project translates classical Ayurvedic constitutional diagnostics (Prakriti Nirupana) from classical Sanskrit texts (Charaka Samhita, Sushruta Samhita) into formal computable rules, bridging indigenous wisdom with computer science."
    },
    {
      q: "How does forward-chaining work in this application?",
      a: "Forward chaining is a data-driven reasoning method. The system begins with asserted facts (the user's responses to the 8 questions) and matches them against the premises of IF-THEN rules in the knowledge base. When a premise matches, the rule fires and executes its consequent (incrementing the Dosha's score) until a conclusion (dominant Prakriti) is inferred."
    },
    {
      q: "What is the computational complexity of the inference algorithm?",
      a: "Time Complexity is O(n), where n = 8 (the number of questions). Because rule lookup is performed via constant-time dictionary hashing, the entire assessment evaluates in linear time with zero looping over unbound search trees. Space Complexity is O(n) to retain working memory facts, scores, and explanation traces."
    },
    {
      q: "How are score ties resolved deterministically?",
      a: "If two or three Doshas obtain identical aggregate scores (for instance, 4 Vata and 4 Pitta), the academic specification applies a deterministic priority order based on classical dictionary enumeration: Vata (वात) > Pitta (पित्त) > Kapha (कफ). The user is also informed of the tie condition in the result report."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      
      {/* Header */}
      <div className="mb-14 text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">
          Collegiate Academic Documentation
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2926] mt-2 mb-4">
          Ayurvedic Classification as a Rule-Based Expert System
        </h1>
        <p className="text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          An academic project synthesizing Indian Knowledge Systems (IKS) with classical Artificial Intelligence and formal production systems.
        </p>
      </div>

      {/* Two Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">Domain Foundation</span>
          <h2 className="text-2xl font-bold text-[#2D2926] mt-1 mb-3">
            Indian Knowledge Systems (IKS)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Ayurveda considers individual constitution (Prakriti) as fixed at conception, formed by the relative predominance of three biological energies: Vata, Pitta, and Kapha. Understanding one's Prakriti provides insights into natural metabolic rhythms, physical tendencies, and behavioral dispositions.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center mb-4 border border-stone-200">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Computer Science Foundation</span>
          <h2 className="text-2xl font-bold text-[#2D2926] mt-1 mb-3">
            Rule-Based Expert Systems
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            A classic artificial intelligence paradigm that formalizes human expert knowledge as IF-THEN conditional rules. Unlike modern opaque deep learning models, expert systems offer 100% deterministic reproducibility and full explainability for every inferred deduction.
          </p>
        </div>
      </div>

      {/* Algorithmic Details & Complexity */}
      <div className="bg-white rounded-2xl p-7 sm:p-10 border border-stone-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-[#2D2926] mb-6">
          Computational Analysis & Complexity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-mono text-stone-500">Time Complexity</span>
            <div className="text-3xl font-bold text-[#2D2926] mt-1">O(n)</div>
            <p className="text-xs text-stone-600 mt-1">
              Where n = 8 (number of questions). Each fact is evaluated through constant-time O(1) dictionary key lookup.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-mono text-stone-500">Space Complexity</span>
            <div className="text-3xl font-bold text-[#2D2926] mt-1">O(n)</div>
            <p className="text-xs text-stone-600 mt-1">
              Linear space to maintain working memory state, score totals, and n explainable audit records.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-[#2D2926] mb-2">Deterministic Tie-Breaking Policy</h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
          When two or more Doshas accumulate the exact same score, the system applies a deterministic priority order:
        </p>
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 font-mono text-xs text-stone-800">
          Vata (वात) &gt; Pitta (पित्त) &gt; Kapha (कफ)
        </div>
      </div>

      {/* Academic Limitations & Assumptions */}
      <div className="bg-white rounded-2xl p-7 sm:p-10 border border-stone-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-[#2D2926] mb-4">
          Academic Scope & Limitations
        </h2>
        <ul className="space-y-3 text-xs sm:text-sm text-stone-600 list-disc list-inside leading-relaxed">
          <li><strong>Predefined Knowledge Base:</strong> The system utilizes a fixed, curated set of classical production rules rather than an open web knowledge graph.</li>
          <li><strong>8 Assessment Categories:</strong> Models 8 key somatic and behavioral dimensions for concise collegiate demonstration.</li>
          <li><strong>Equal Unit Weighting:</strong> Every matched rule contributes an equal unit increment of +1 point.</li>
          <li><strong>Dominant Dosha Focus:</strong> While classical Ayurveda also models bi-doshic (e.g. Vata-Pitta) and tri-doshic states (Sama Prakriti), this implementation focuses on primary dominance for algorithmic clarity.</li>
          <li><strong>Pure Determinism:</strong> Avoids generative AI or statistical probabilistic models to ensure transparent, reproducible reasoning.</li>
        </ul>
      </div>

      {/* Viva / Reviewer Q&A Accordion */}
      <div className="bg-white rounded-2xl p-7 sm:p-10 border border-stone-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-[#2D2926] mb-2 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#A67C52]" />
          <span>Project Review & Viva Preparation Guide</span>
        </h2>
        <p className="text-xs text-stone-500 mb-6">
          Key questions frequently asked during IKS and CS project defense presentations.
        </p>

        <div className="space-y-3">
          {vivaQuestions.map((item, idx) => (
            <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 bg-stone-50 hover:bg-stone-100 transition-colors text-left text-xs sm:text-sm font-bold text-[#2D2926] flex items-center justify-between cursor-pointer"
              >
                <span>{item.q}</span>
                <span className="text-stone-400 ml-2">
                  {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              {openFaq === idx && (
                <div className="p-4 bg-white text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};
