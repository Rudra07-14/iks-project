import React, { useState } from 'react';
import { RotateCcw, Printer, ChevronDown, ChevronUp, CheckCircle, Info, Sparkles, BookOpen, Layers } from 'lucide-react';
import { AssessmentResult } from '../expert_engine';

interface ResultViewProps {
  result: AssessmentResult;
  onRestart: () => void;
  onLearnMore: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onRestart, onLearnMore }) => {
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const getDoshaAccent = (dosha: string) => {
    switch (dosha) {
      case 'Vata':
        return {
          barColor: 'bg-blue-500',
          badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
          topBar: 'bg-blue-500',
          borderHighlight: 'border-blue-200'
        };
      case 'Pitta':
        return {
          barColor: 'bg-amber-500',
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          topBar: 'bg-amber-500',
          borderHighlight: 'border-amber-200'
        };
      case 'Kapha':
      default:
        return {
          barColor: 'bg-emerald-600',
          badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          topBar: 'bg-emerald-600',
          borderHighlight: 'border-emerald-200'
        };
    }
  };

  const accent = getDoshaAccent(result.dominantDosha);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Top Inference Success Banner */}
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-xs flex items-center justify-between mb-8 shadow-xs">
        <div className="flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>
            <strong>Inference Successful:</strong> All 8 responses were evaluated against the expert production rules without errors.
          </span>
        </div>
        <span className="font-mono text-[11px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
          Linear O(8) Evaluation
        </span>
      </div>

      {/* Dominant Dosha Card */}
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-sm mb-10 text-center relative overflow-hidden">
        <div className={`h-2 w-full ${accent.topBar} absolute top-0 left-0`} />

        <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#A67C52] mb-2">
          Your Prakriti Result · Dominant Dosha
        </div>

        {/* Dominant Dosha Heading */}
        <div className="text-5xl sm:text-6xl font-bold tracking-tight text-[#2D2926] mb-3 flex items-center justify-center gap-3">
          <span>{result.dominantDosha}</span>
          <span className="text-3xl sm:text-4xl text-[#A67C52] font-normal">
            ({result.dominantDetails.sanskrit})
          </span>
        </div>

        <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto mb-6 leading-relaxed">
          {result.dominantDetails.summary}
        </p>

        {/* Qualitative tags */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 text-xs mb-4">
          <span className="px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
            <strong>Constituent Elements:</strong> {result.dominantDetails.elements}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
            <strong>Governing Attributes:</strong> {result.dominantDetails.coreAttributes}
          </span>
        </div>

        {/* Tie Handling Notice */}
        {result.isTie && (
          <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 text-xs text-left max-w-xl mx-auto">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#A67C52] flex-shrink-0 mt-0.5" />
              <div>
                <strong>Deterministic Tie Resolution:</strong> Multiple Doshas achieved equal maximum scores ({result.tiedDoshas.join(', ')}). In accordance with the academic project specification, the deterministic engine applied priority order <code>Vata &gt; Pitta &gt; Kapha</code> to select <strong>{result.dominantDosha}</strong>.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Score Visualization */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm mb-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-[#2D2926]">
            Your Rule-Based Score Breakdown
          </h2>
          <span className="text-xs font-mono text-stone-400">
            Total Rules Fired: 8 / 8
          </span>
        </div>
        <p className="text-xs text-stone-500 mb-8">
          Each characteristic you selected matched an IF-THEN rule, incrementing that Dosha's score by +1.
        </p>

        {/* Horizontal Progress Bars */}
        <div className="space-y-6">
          
          {/* Vata */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="flex items-center gap-2 text-sky-900">
                <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" />
                Vata (वात)
              </span>
              <span className="font-mono text-xs text-stone-500">
                {result.scores.Vata} / 8 points ({result.percentages.Vata}%)
              </span>
            </div>
            <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-sky-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${result.percentages.Vata}%` }}
              />
            </div>
          </div>

          {/* Pitta */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="flex items-center gap-2 text-amber-900">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                Pitta (पित्त)
              </span>
              <span className="font-mono text-xs text-stone-500">
                {result.scores.Pitta} / 8 points ({result.percentages.Pitta}%)
              </span>
            </div>
            <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${result.percentages.Pitta}%` }}
              />
            </div>
          </div>

          {/* Kapha */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="flex items-center gap-2 text-emerald-900">
                <span className="w-3 h-3 rounded-full bg-emerald-700 inline-block" />
                Kapha (कफ)
              </span>
              <span className="font-mono text-xs text-stone-500">
                {result.scores.Kapha} / 8 points ({result.percentages.Kapha}%)
              </span>
            </div>
            <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-700 h-full rounded-full transition-all duration-700"
                style={{ width: `${result.percentages.Kapha}%` }}
              />
            </div>
          </div>
        </div>

        {/* Three Score Summary Metric Cards */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-stone-200 text-center">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-[10px] uppercase font-bold text-sky-800 tracking-wider">Vata Score</div>
            <div className="text-3xl font-bold text-[#2D2926] mt-1">{result.scores.Vata}</div>
            <div className="text-[10px] text-stone-400 font-mono mt-0.5">{result.percentages.Vata}% of total</div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Pitta Score</div>
            <div className="text-3xl font-bold text-[#2D2926] mt-1">{result.scores.Pitta}</div>
            <div className="text-[10px] text-stone-400 font-mono mt-0.5">{result.percentages.Pitta}% of total</div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Kapha Score</div>
            <div className="text-3xl font-bold text-[#2D2926] mt-1">{result.scores.Kapha}</div>
            <div className="text-[10px] text-stone-400 font-mono mt-0.5">{result.percentages.Kapha}% of total</div>
          </div>
        </div>
      </div>

      {/* Explanation Timeline */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#2D2926]">
              How the System Reached This Result
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Deterministic rule execution trace: sequential evaluation of your 8 facts.
            </p>
          </div>
          <span className="text-xs font-mono bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200 text-stone-600">
            Explainable AI
          </span>
        </div>

        <div className="space-y-3">
          {result.explanations.map((trace) => {
            const isVata = trace.dosha === 'Vata';
            const isPitta = trace.dosha === 'Pitta';

            const badgeColor = isVata
              ? 'bg-sky-50 text-sky-800 border border-sky-200'
              : isPitta
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200';

            return (
              <div
                key={trace.step}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-stone-200 text-stone-700 text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                    0{trace.step}
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-[#2D2926] flex items-center gap-2">
                      <span>{trace.category}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${badgeColor}`}>
                        {trace.dosha} Rule Matched
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5">
                      "{trace.selectedFact}"
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 text-xs font-mono font-semibold text-[#2D2926]">
                  {trace.dosha} +1 <span className="text-[11px] text-stone-400">({trace.prevScore} → {trace.newScore})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Rule Inspector (Collapsible Accordion) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm mb-10">
        <button
          onClick={() => setInspectorOpen(!inspectorOpen)}
          className="w-full flex items-center justify-between text-left cursor-pointer select-none"
        >
          <div>
            <h3 className="text-xl font-bold text-[#2D2926] flex items-center gap-2">
              <span>View Deep Rule Evaluation (Viva Inspector)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Inspect formal IF-THEN clauses, premises, consequents, and classical Ayurvedic rationales.
            </p>
          </div>
          <div className="p-2 rounded-lg bg-stone-100 text-stone-700 border border-stone-200">
            {inspectorOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {inspectorOpen && (
          <div className="mt-6 pt-6 border-t border-stone-200 space-y-4">
            {result.explanations.map((trace) => (
              <div
                key={trace.step}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono space-y-2"
              >
                <div className="flex items-center justify-between text-[#2D2926] font-bold">
                  <span>STEP 0{trace.step}: {trace.category.toUpperCase()}</span>
                  <span className={trace.dosha === 'Vata' ? 'text-sky-700' : trace.dosha === 'Pitta' ? 'text-amber-700' : 'text-emerald-700'}>
                    RULE FIRED → {trace.dosha.toUpperCase()} (+1)
                  </span>
                </div>

                <div className="text-stone-700 font-sans">
                  <strong>Asserted Fact:</strong> {trace.selectedFact}
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
                  <div>
                    <strong className="text-[#A67C52]">IF:</strong> {trace.ruleIf}
                  </div>
                  <div>
                    <strong className="text-[#4A5D4E]">THEN:</strong> {trace.ruleThen} (Score updated: {trace.prevScore} → {trace.newScore})
                  </div>
                </div>

                <div className="text-stone-600 font-sans">
                  <strong>Ayurvedic Rationale:</strong> {trace.reason}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4A5D4E] text-white text-sm font-semibold hover:bg-[#3C4C3F] transition-colors shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart Assessment</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 text-stone-800 text-sm font-semibold hover:bg-stone-200 transition-colors border border-stone-200 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Result</span>
          </button>
          <button
            onClick={onLearnMore}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 text-stone-800 text-sm font-semibold hover:bg-stone-200 transition-colors border border-stone-200 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>How Engine Works</span>
          </button>
        </div>
      </div>

      {/* Strict Medical Disclaimer */}
      <div className="mt-10 p-5 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 leading-relaxed">
        <strong className="text-[#2D2926]">Educational Project Disclaimer:</strong> This application is an educational demonstration of Ayurvedic Prakriti classification implemented as a rule-based expert system. It is not a medical diagnostic tool and does not provide medical treatment, medicine recommendations, or professional Ayurvedic consultation.
      </div>

    </div>
  );
};
