"""
Academic Test Suite for Ayurvedic Prakriti Rule-Based Expert System
===================================================================
Indian Knowledge Systems (IKS) x Computer Science Expert System

This test suite rigorously verifies the 15 academic test cases (TC01 to TC15)
specified in the project report, confirming deterministic forward-chaining
rule evaluation, score accumulation, tie resolution, and explainable inference.
"""

import os
import sys
import unittest

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from expert_engine import evaluate_assessment, PrakritiExpertEngine, ValidationError
from rules import QUESTIONS, RULES, DOSHA_DETAILS


class TestPrakritiExpertEngine(unittest.TestCase):
    """Academic Test Cases for the Prakriti Rule-Based Expert System."""

    def setUp(self):
        self.engine = PrakritiExpertEngine()

    def test_tc01_all_vata(self):
        """TC01: All 8 answers are Vata -> Vata=8, Pitta=0, Kapha=0, Dominant=Vata"""
        answers = {f"q{i}": "vata" for i in range(1, 9)}
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 8)
        self.assertEqual(res["scores"]["Pitta"], 0)
        self.assertEqual(res["scores"]["Kapha"], 0)
        self.assertEqual(res["dominant_dosha"], "Vata")
        self.assertEqual(res["total_score"], 8)

    def test_tc02_all_pitta(self):
        """TC02: All 8 answers are Pitta -> Vata=0, Pitta=8, Kapha=0, Dominant=Pitta"""
        answers = {f"q{i}": "pitta" for i in range(1, 9)}
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 0)
        self.assertEqual(res["scores"]["Pitta"], 8)
        self.assertEqual(res["scores"]["Kapha"], 0)
        self.assertEqual(res["dominant_dosha"], "Pitta")
        self.assertEqual(res["total_score"], 8)

    def test_tc03_all_kapha(self):
        """TC03: All 8 answers are Kapha -> Vata=0, Pitta=0, Kapha=8, Dominant=Kapha"""
        answers = {f"q{i}": "kapha" for i in range(1, 9)}
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 0)
        self.assertEqual(res["scores"]["Pitta"], 0)
        self.assertEqual(res["scores"]["Kapha"], 8)
        self.assertEqual(res["dominant_dosha"], "Kapha")
        self.assertEqual(res["total_score"], 8)

    def test_tc04_five_vata_two_pitta_one_kapha(self):
        """TC04: 5 Vata, 2 Pitta, 1 Kapha -> Vata=5, Pitta=2, Kapha=1, Dominant=Vata"""
        answers = {
            "q1": "vata", "q2": "vata", "q3": "vata", "q4": "vata", "q5": "vata",
            "q6": "pitta", "q7": "pitta",
            "q8": "kapha"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 5)
        self.assertEqual(res["scores"]["Pitta"], 2)
        self.assertEqual(res["scores"]["Kapha"], 1)
        self.assertEqual(res["dominant_dosha"], "Vata")

    def test_tc05_two_vata_five_pitta_one_kapha(self):
        """TC05: 2 Vata, 5 Pitta, 1 Kapha -> Dominant=Pitta"""
        answers = {
            "q1": "vata", "q2": "vata",
            "q3": "pitta", "q4": "pitta", "q5": "pitta", "q6": "pitta", "q7": "pitta",
            "q8": "kapha"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 2)
        self.assertEqual(res["scores"]["Pitta"], 5)
        self.assertEqual(res["scores"]["Kapha"], 1)
        self.assertEqual(res["dominant_dosha"], "Pitta")

    def test_tc06_one_vata_two_pitta_five_kapha(self):
        """TC06: 1 Vata, 2 Pitta, 5 Kapha -> Dominant=Kapha"""
        answers = {
            "q1": "vata",
            "q2": "pitta", "q3": "pitta",
            "q4": "kapha", "q5": "kapha", "q6": "kapha", "q7": "kapha", "q8": "kapha"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 1)
        self.assertEqual(res["scores"]["Pitta"], 2)
        self.assertEqual(res["scores"]["Kapha"], 5)
        self.assertEqual(res["dominant_dosha"], "Kapha")

    def test_tc07_four_vata_three_pitta_one_kapha(self):
        """TC07: 4 Vata, 3 Pitta, 1 Kapha -> Dominant=Vata"""
        answers = {
            "q1": "vata", "q2": "vata", "q3": "vata", "q4": "vata",
            "q5": "pitta", "q6": "pitta", "q7": "pitta",
            "q8": "kapha"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 4)
        self.assertEqual(res["scores"]["Pitta"], 3)
        self.assertEqual(res["scores"]["Kapha"], 1)
        self.assertEqual(res["dominant_dosha"], "Vata")

    def test_tc08_two_vata_four_pitta_two_kapha(self):
        """TC08: 2 Vata, 4 Pitta, 2 Kapha -> Dominant=Pitta"""
        answers = {
            "q1": "vata", "q2": "vata",
            "q3": "pitta", "q4": "pitta", "q5": "pitta", "q6": "pitta",
            "q7": "kapha", "q8": "kapha"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 2)
        self.assertEqual(res["scores"]["Pitta"], 4)
        self.assertEqual(res["scores"]["Kapha"], 2)
        self.assertEqual(res["dominant_dosha"], "Pitta")

    def test_tc09_two_vata_one_pitta_five_kapha(self):
        """TC09: 2 Vata, 1 Pitta, 5 Kapha -> Dominant=Kapha"""
        answers = {
            "q1": "vata", "q2": "vata",
            "q3": "pitta",
            "q4": "kapha", "q5": "kapha", "q6": "kapha", "q7": "kapha", "q8": "kapha"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 2)
        self.assertEqual(res["scores"]["Pitta"], 1)
        self.assertEqual(res["scores"]["Kapha"], 5)
        self.assertEqual(res["dominant_dosha"], "Kapha")

    def test_tc10_tie_vata_and_pitta(self):
        """TC10: Vata = 4 and Pitta = 4 -> Tie, Vata selected (Vata > Pitta precedence)"""
        answers = {
            "q1": "vata", "q2": "vata", "q3": "vata", "q4": "vata",
            "q5": "pitta", "q6": "pitta", "q7": "pitta", "q8": "pitta"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 4)
        self.assertEqual(res["scores"]["Pitta"], 4)
        self.assertEqual(res["scores"]["Kapha"], 0)
        self.assertEqual(res["dominant_dosha"], "Vata")
        self.assertTrue(res["is_tie"])
        self.assertIn("Vata", res["tied_doshas"])
        self.assertIn("Pitta", res["tied_doshas"])

    def test_tc11_tie_pitta_and_kapha(self):
        """TC11: Pitta = 4 and Kapha = 4 -> Tie, Pitta selected (Pitta > Kapha precedence)"""
        answers = {
            "q1": "pitta", "q2": "pitta", "q3": "pitta", "q4": "pitta",
            "q5": "kapha", "q6": "kapha", "q7": "kapha", "q8": "kapha"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"], 0)
        self.assertEqual(res["scores"]["Pitta"], 4)
        self.assertEqual(res["scores"]["Kapha"], 4)
        self.assertEqual(res["dominant_dosha"], "Pitta")
        self.assertTrue(res["is_tie"])
        self.assertIn("Pitta", res["tied_doshas"])
        self.assertIn("Kapha", res["tied_doshas"])

    def test_tc12_missing_required_answer(self):
        """TC12: Missing required answer -> Submission blocked / ValidationError raised"""
        incomplete_answers = {
            "q1": "vata", "q2": "pitta", "q3": "kapha"
            # q4 through q8 missing
        }
        with self.assertRaises(ValidationError) as ctx:
            self.engine.evaluate(incomplete_answers)
        self.assertIn("Missing required responses", str(ctx.exception))

    def test_tc13_all_eight_answers_completed(self):
        """TC13: All 8 answers completed -> Result processed successfully"""
        answers = {
            "q1": "vata", "q2": "pitta", "q3": "kapha", "q4": "vata",
            "q5": "pitta", "q6": "kapha", "q7": "vata", "q8": "pitta"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["total_questions"], 8)
        self.assertIn(res["dominant_dosha"], ["Vata", "Pitta", "Kapha"])
        self.assertEqual(len(res["explanations"]), 8)

    def test_tc14_mixed_answers_sum_to_eight(self):
        """TC14: Mixed answers from all three Doshas -> Total score == 8"""
        answers = {
            "q1": "vata", "q2": "vata", "q3": "vata",
            "q4": "pitta", "q5": "pitta", "q6": "pitta",
            "q7": "kapha", "q8": "kapha"
        }
        res = self.engine.evaluate(answers)
        self.assertEqual(res["scores"]["Vata"] + res["scores"]["Pitta"] + res["scores"]["Kapha"], 8)
        self.assertEqual(res["total_score"], 8)

    def test_tc15_completed_assessment_structure(self):
        """TC15: Completed assessment result -> Dominant Dosha, all scores, explanation trace"""
        answers = {f"q{i}": "pitta" for i in range(1, 9)}
        res = self.engine.evaluate(answers)
        self.assertIn("dominant_dosha", res)
        self.assertIn("scores", res)
        self.assertIn("explanations", res)
        self.assertEqual(len(res["explanations"]), 8)
        
        # Verify explainable reasoning contents for step 1
        first_step = res["explanations"][0]
        self.assertIn("step", first_step)
        self.assertIn("rule_if", first_step)
        self.assertIn("rule_then", first_step)
        self.assertIn("reason", first_step)
        self.assertIn("prev_score", first_step)
        self.assertIn("new_score", first_step)
        self.assertEqual(first_step["new_score"], 1)


if __name__ == "__main__":
    unittest.main()
