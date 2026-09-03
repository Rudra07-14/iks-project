import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Sparkles, AlertCircle } from 'lucide-react';
import { QUESTIONS, REQUIRED_QUESTIONS, evaluateAssessment, AssessmentResult } from '../expert_engine';

interface AssessmentWizardProps {
  onComplete: (result: AssessmentResult) => void;
  savedAnswers?: Record<string, string>;
}

export const AssessmentWizard: React.FC<AssessmentWizardProps> = ({
  onComplete,
  savedAnswers = {},
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    // Try restoring from localStorage or prop
    try {
      const stored = localStorage.getItem('prakriti_current_answers');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return savedAnswers;
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentQid = REQUIRED_QUESTIONS[currentStep];
  const questionData = QUESTIONS[currentQid];
  const totalSteps = REQUIRED_QUESTIONS.length;
  const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('prakriti_current_answers', JSON.stringify(answers));
    } catch {
      // ignore
    }
  }, [answers]);

  const handleSelectOption = (optionKey: 'vata' | 'pitta' | 'kapha') => {
    setAnswers((prev) => ({
      ...prev,
      [currentQid]: optionKey,
    }));
    setErrorMessage(null);
  };

  const handleNext = () => {
    if (!answers[currentQid]) {
      setErrorMessage('Please choose a characteristic to continue the inference process.');
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setErrorMessage(null);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Final submission
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setErrorMessage(null);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    // Ensure all 8 are answered
    for (const qid of REQUIRED_QUESTIONS) {
      if (!answers[qid]) {
        const missingIdx = REQUIRED_QUESTIONS.indexOf(qid);
        setCurrentStep(missingIdx);
        setErrorMessage(`Please complete Question ${missingIdx + 1} (${QUESTIONS[qid].category}).`);
        return;
      }
    }

    try {
      const evaluationResult = evaluateAssessment(answers);
      onComplete(evaluationResult);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error executing expert system inference.');
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === '1') {
        handleSelectOption('vata');
      } else if (e.key === '2') {
        handleSelectOption('pitta');
      } else if (e.key === '3') {
        handleSelectOption('kapha');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, answers, currentQid]);

  const selectedAnswer = answers[currentQid];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Top Header */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">
          Prakriti Classification Assessment
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2D2926] mt-1 mb-2">
          Question {currentStep + 1} of {totalSteps}
        </h1>
        <p className="text-sm text-stone-600">
          Select the option that best reflects your natural, baseline physical or behavioral tendency.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-600 mb-2">
          <span>
            Input Fact Assertion {currentStep + 1} / {totalSteps}
          </span>
          <span className="font-mono text-[#2D2926] font-bold">{progressPercentage}% Completed</span>
        </div>
        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#4A5D4E] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm relative">
        
        {/* Category Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
            Category: {questionData.category}
          </span>
          <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Rule {currentStep + 1} Premise
          </span>
        </div>

        {/* Question Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2926] mb-8 leading-snug">
          {questionData.title}
        </h2>

        {/* 3 Options */}
        <div className="space-y-3.5">
          {(['vata', 'pitta', 'kapha'] as const).map((optKey, idx) => {
            const isSelected = selectedAnswer === optKey;
            const text = questionData.options[optKey];

            return (
              <div
                key={optKey}
                onClick={() => handleSelectOption(optKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleSelectOption(optKey);
                  }
                }}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                  isSelected
                    ? 'border-[#A67C52] bg-stone-50 shadow-sm ring-1 ring-[#A67C52]'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                }`}
              >
                {/* Radio Indicator */}
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'border-[#A67C52] bg-[#A67C52] text-white'
                      : 'border-stone-300 bg-white'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm sm:text-base font-medium text-[#2D2926] leading-snug">
                      {text}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 hidden sm:inline">
                      [Key {idx + 1}]
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-stone-400 mt-1.5 uppercase tracking-wider">
                    Fires {optKey.toUpperCase()} Rule (+1 point)
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-200">
          {currentStep > 0 ? (
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-[#4A5D4E] text-white hover:bg-[#3C4C3F] transition-colors shadow-sm cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full bg-[#A67C52] text-white hover:bg-[#8F6A44] transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run Inference & View Result</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Keyboard Helper Hint */}
      <div className="mt-4 text-center text-xs text-stone-400">
        Press keys <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 rounded text-stone-600 font-mono">1</kbd>, <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 rounded text-stone-600 font-mono">2</kbd>, <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 rounded text-stone-600 font-mono">3</kbd> to select, and <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 rounded text-stone-600 font-mono">Enter</kbd> to advance.
      </div>

    </div>
  );
};
