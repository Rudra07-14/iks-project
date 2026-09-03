/**
 * Ayurvedic Prakriti Rule-Based Inference Engine (TypeScript)
 * Indian Knowledge Systems (IKS) x Computer Science Expert System
 */

import { RULES, QUESTIONS, DOSHA_METADATA, DoshaMetadata } from './rules';

export { RULES, QUESTIONS, DOSHA_METADATA };

export interface ExplanationTrace {
  step: number;
  questionId: string;
  category: string;
  questionTitle: string;
  choiceKey: 'vata' | 'pitta' | 'kapha';
  selectedFact: string;
  dosha: 'Vata' | 'Pitta' | 'Kapha';
  scoreIncrement: number;
  prevScore: number;
  newScore: number;
  ruleIf: string;
  ruleThen: string;
  reason: string;
}

export interface AssessmentResult {
  scores: {
    Vata: number;
    Pitta: number;
    Kapha: number;
  };
  dominantDosha: 'Vata' | 'Pitta' | 'Kapha';
  dominantDetails: DoshaMetadata;
  totalQuestions: number;
  totalScore: number;
  percentages: {
    Vata: number;
    Pitta: number;
    Kapha: number;
  };
  explanations: ExplanationTrace[];
  isTie: boolean;
  tiedDoshas: ('Vata' | 'Pitta' | 'Kapha')[];
  userAnswers: Record<string, string>;
}

export const REQUIRED_QUESTIONS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateAnswers(answers: Record<string, string>): void {
  if (!answers || typeof answers !== 'object') {
    throw new ValidationError('Answers payload must be a valid object.');
  }

  const missing: string[] = [];
  for (const qid of REQUIRED_QUESTIONS) {
    const val = answers[qid];
    if (!val || !val.trim()) {
      missing.push(QUESTIONS[qid]?.category || qid);
    }
  }

  if (missing.length > 0) {
    throw new ValidationError(
      `Missing required responses for ${missing.length} questions: ${missing.join(', ')}.`
    );
  }

  for (const [qid, val] of Object.entries(answers)) {
    if (!RULES[qid]) {
      throw new ValidationError(`Unknown question identifier: ${qid}`);
    }
    const clean = val.toLowerCase().trim();
    if (clean !== 'vata' && clean !== 'pitta' && clean !== 'kapha') {
      throw new ValidationError(`Invalid answer '${val}' for question ${qid}. Expected vata, pitta, or kapha.`);
    }
  }
}

/**
 * Executes deterministic forward-chaining rule evaluation.
 */
export function evaluateAssessment(userAnswers: Record<string, string>): AssessmentResult {
  // Validate input facts
  validateAnswers(userAnswers);

  // Initialize Working Memory scores
  const scores: { Vata: number; Pitta: number; Kapha: number } = {
    Vata: 0,
    Pitta: 0,
    Kapha: 0
  };

  const explanations: ExplanationTrace[] = [];

  // Sequential rule execution Q1 -> Q8
  REQUIRED_QUESTIONS.forEach((qid, idx) => {
    const rawChoice = userAnswers[qid];
    const choiceKey = rawChoice.toLowerCase().trim() as 'vata' | 'pitta' | 'kapha';

    const qInfo = QUESTIONS[qid];
    const rule = RULES[qid][choiceKey];
    const affectedDosha = rule.dosha;
    const scoreIncrement = rule.score;

    const prevScore = scores[affectedDosha];
    scores[affectedDosha] += scoreIncrement;
    const newScore = scores[affectedDosha];

    const selectedFact = qInfo.options[choiceKey];

    explanations.push({
      step: idx + 1,
      questionId: qid,
      category: qInfo.category,
      questionTitle: qInfo.title,
      choiceKey,
      selectedFact,
      dosha: affectedDosha,
      scoreIncrement,
      prevScore,
      newScore,
      ruleIf: rule.ifCondition,
      ruleThen: rule.thenAction,
      reason: rule.reason
    });
  });

  // Calculate dominant Dosha with deterministic tie breaking:
  // In Python's max(scores, key=scores.get):
  // insertion order is Vata, Pitta, Kapha
  // If Vata >= Pitta and Vata >= Kapha => Vata
  // Else if Pitta >= Kapha => Pitta
  // Else => Kapha
  let dominantDosha: 'Vata' | 'Pitta' | 'Kapha' = 'Vata';
  if (scores.Vata >= scores.Pitta && scores.Vata >= scores.Kapha) {
    dominantDosha = 'Vata';
  } else if (scores.Pitta >= scores.Kapha) {
    dominantDosha = 'Pitta';
  } else {
    dominantDosha = 'Kapha';
  }

  const maxVal = scores[dominantDosha];
  const doshaKeys: ('Vata' | 'Pitta' | 'Kapha')[] = ['Vata', 'Pitta', 'Kapha'];
  const tiedDoshas = doshaKeys.filter(d => scores[d] === maxVal);
  const isTie = tiedDoshas.length > 1;

  const totalScore = scores.Vata + scores.Pitta + scores.Kapha;
  const percentages = {
    Vata: totalScore > 0 ? Math.round((scores.Vata / totalScore) * 1000) / 10 : 0,
    Pitta: totalScore > 0 ? Math.round((scores.Pitta / totalScore) * 1000) / 10 : 0,
    Kapha: totalScore > 0 ? Math.round((scores.Kapha / totalScore) * 1000) / 10 : 0
  };

  return {
    scores,
    dominantDosha,
    dominantDetails: DOSHA_METADATA[dominantDosha],
    totalQuestions: REQUIRED_QUESTIONS.length,
    totalScore,
    percentages,
    explanations,
    isTie,
    tiedDoshas,
    userAnswers
  };
}
