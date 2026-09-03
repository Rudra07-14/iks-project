"""
Ayurvedic Prakriti Rule-Based Inference Engine
==============================================
Indian Knowledge Systems (IKS) x Computer Science Expert System

This module implements the deterministic, forward-chaining inference engine.
It evaluates user-submitted facts against the predefined production rules,
accumulates category scores for Vata, Pitta, and Kapha, and selects the
dominant classification using the academic rule-based algorithm.
"""

from typing import Dict, Any, List, Optional
from rules import RULES, QUESTIONS, DOSHA_DETAILS


class ExpertSystemError(Exception):
    """Base exception for the expert system."""
    pass


class ValidationError(ExpertSystemError):
    """Raised when the assessment input is incomplete or malformed."""
    pass


REQUIRED_QUESTION_IDS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"]
VALID_DOSHA_KEYS = {"vata", "pitta", "kapha"}


class PrakritiExpertEngine:
    """
    Deterministic rule-based expert system inference engine for Ayurvedic
    Prakriti classification.
    """

    def __init__(self):
        self.rules = RULES
        self.questions = QUESTIONS
        self.dosha_details = DOSHA_DETAILS

    def validate_inputs(self, user_answers: Dict[str, str]) -> None:
        """
        Validates that all required questions have been answered with
        valid known facts.

        Raises:
            ValidationError: If any required question is missing, empty, or invalid.
        """
        if not isinstance(user_answers, dict):
            raise ValidationError("Assessment payload must be a key-value dictionary.")

        missing_questions = []
        for qid in REQUIRED_QUESTION_IDS:
            val = user_answers.get(qid)
            if not val or not str(val).strip():
                missing_questions.append(qid)

        if missing_questions:
            missing_names = [
                self.questions.get(q, {}).get("category", q)
                for q in missing_questions
            ]
            raise ValidationError(
                f"Missing required responses for {len(missing_questions)} questions: "
                f"{', '.join(missing_names)}."
            )

        for qid, val in user_answers.items():
            if qid not in self.rules:
                raise ValidationError(f"Invalid question identifier '{qid}'.")
            clean_val = str(val).lower().strip()
            if clean_val not in VALID_DOSHA_KEYS:
                raise ValidationError(
                    f"Invalid answer '{val}' for question '{qid}'. "
                    f"Expected one of: {', '.join(VALID_DOSHA_KEYS)}."
                )

    def evaluate(self, user_answers: Dict[str, str]) -> Dict[str, Any]:
        """
        Executes the rule-based inference algorithm over the user answers.

        Algorithm:
        1. Initialize Dosha scores: Vata=0, Pitta=0, Kapha=0
        2. FOR each question Q1 -> Q8:
               Retrieve selected answer fact
               Match against predefined knowledge base IF-THEN rules
               Increment matched Dosha score by rule weight (+1)
               Log explainable inference trace
        3. Compare final scores
        4. Select highest score (max with deterministic tie resolution)
        5. Return comprehensive result artifact with explainable reasoning

        Args:
            user_answers: Dict mapping question ID (e.g. 'q1') to option ('vata'/'pitta'/'kapha')

        Returns:
            Dict containing scores, dominant_dosha, explanations, and metadata.
        """
        # Step 1: Input Validation
        self.validate_inputs(user_answers)

        # Step 2: Initialize working memory scores
        scores = {
            "Vata": 0,
            "Pitta": 0,
            "Kapha": 0
        }

        explanations: List[Dict[str, Any]] = []

        # Step 3: Iterate through each question in deterministic order
        for step_idx, qid in enumerate(REQUIRED_QUESTION_IDS, start=1):
            raw_choice = user_answers[qid]
            choice_key = str(raw_choice).lower().strip()

            q_info = self.questions[qid]
            rule = self.rules[qid][choice_key]
            affected_dosha = rule["dosha"]
            score_increment = rule["score"]

            prev_score = scores[affected_dosha]
            scores[affected_dosha] += score_increment
            new_score = scores[affected_dosha]

            selected_fact = q_info["options"][choice_key]

            # Record detailed inference trace for explainable AI reasoning
            explanations.append({
                "step": step_idx,
                "question_id": qid,
                "category": q_info["category"],
                "question_title": q_info["title"],
                "choice_key": choice_key,
                "selected_fact": selected_fact,
                "dosha": affected_dosha,
                "score_increment": score_increment,
                "prev_score": prev_score,
                "new_score": new_score,
                "rule_if": rule["if"],
                "rule_then": rule["then"],
                "reason": rule["reason"]
            })

        # Step 4: Compare final scores & resolve dominant classification
        # In Python, max() with insertion-ordered dict resolves ties by selecting
        # the first occurring maximum: Vata -> Pitta -> Kapha
        dominant_dosha = max(scores, key=scores.get)

        total_score = sum(scores.values())

        # Check for ties for educational transparency
        max_val = scores[dominant_dosha]
        tied_doshas = [d for d, s in scores.items() if s == max_val]
        is_tie = len(tied_doshas) > 1

        # Calculate percentages
        percentages = {
            dosha: round((score / total_score) * 100, 1) if total_score > 0 else 0.0
            for dosha, score in scores.items()
        }

        return {
            "scores": scores,
            "dominant_dosha": dominant_dosha,
            "dominant_details": self.dosha_details[dominant_dosha],
            "total_questions": len(REQUIRED_QUESTION_IDS),
            "total_score": total_score,
            "percentages": percentages,
            "explanations": explanations,
            "is_tie": is_tie,
            "tied_doshas": tied_doshas,
            "user_answers": user_answers
        }


# Convenience singleton function for external callers
_engine_instance: Optional[PrakritiExpertEngine] = None


def get_expert_engine() -> PrakritiExpertEngine:
    global _engine_instance
    if _engine_instance is None:
        _engine_instance = PrakritiExpertEngine()
    return _engine_instance


def evaluate_assessment(user_answers: Dict[str, str]) -> Dict[str, Any]:
    """Top-level evaluation helper function."""
    return get_expert_engine().evaluate(user_answers)
