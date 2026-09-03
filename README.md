# Ayurvedic Classification as a Rule-Based Expert System

An **Indian Knowledge Systems (IKS) × Computer Science** academic project demonstrating how traditional Ayurvedic constitutional diagnostic principles (*Prakriti Nirupana*) from classical treatises (*Charaka Samhita*, *Sushruta Samhita*) can be formalized as an Artificial Intelligence **Rule-Based Expert System**.

---

## 🌿 Project Abstract

In classical Ayurveda, every individual possesses an innate biological constitution known as **Prakriti**, determined by the relative equilibrium of the three biological energies (**Tridosha**): **Vata** (वात), **Pitta** (पित्त), and **Kapha** (कफ).

This project demonstrates that classical Ayurvedic constitutional assessment can be modeled with mathematical determinism through **Production Rules (IF-THEN clauses)** and a **Forward-Chaining Inference Engine**. The system intentionally excludes black-box machine learning or statistical neural networks to ensure **100% explainability, auditability, and deterministic reproducibility**.

---

## 🏛️ IKS × Computer Science Conceptual Mapping

| Ayurvedic Domain (IKS) | Computer Science Concept | Technical Manifestation |
| :--- | :--- | :--- |
| **Ayurveda (आयुर्वेद)** | Knowledge Domain | Physiological rule foundation |
| **Prakriti Assessment (प्रकृति परीक्षण)** | Questionnaire Interface | 8-step input fact collector |
| **Characteristics (लक्षण)** | Asserted Input Facts | Working memory propositions |
| **Classical Texts (चरकसंहिता)** | Knowledge Base | Production rule definitions (`rules.py`, `src/rules.ts`) |
| **Constitutional Rules (निदान नियम)** | IF-THEN Rules | Conditional premises & unit increments |
| **Prakriti Analysis (प्रकृति विचार)** | Forward-Chaining Inference | Linear pattern matching (`expert_engine.py`) |
| **Tridosha (त्रिदोष)** | Classification Categories | Vata, Pitta, Kapha score counters |
| **Dominant Dosha (प्रधान दोष)** | Classification Output | Maximum score (Argmax with deterministic tie handling) |
| **Ayurvedic Rationale (युक्ति प्रमाण)** | Explainable AI Reasoning | Audit trace explaining which rules fired and why |

---

## ⚙️ Algorithmic Architecture & Complexity

### 1. The 8-Stage Forward-Chaining Pipeline
```
USER RESPONSES  ──>  ASSERTED FACTS  ──>  KNOWLEDGE BASE  ──>  IF-THEN EVALUATION
                                                                        │
DOMINANT DOSHA  <──  TIE-BREAKER  <──  ARGMAX SCORES  <──  SCORE ACCUMULATION (+1)
```

1. **User Input:** The individual responds to 8 standard somatic and behavioral queries.
2. **Fact Assertion:** Each response is formalized as an asserted fact in working memory.
3. **Knowledge Base Lookup:** The inference engine matches each fact against production rules.
4. **Rule Firing:** When `condition == fact`, the rule fires.
5. **Score Increment:** The consequent action adds `+1` to the matched Dosha counter.
6. **Evidence Aggregation:** Scores across Vata, Pitta, and Kapha are aggregated (sum = 8).
7. **Dominant Selection:** The highest scoring Dosha is classified as dominant.
8. **Explainable Trace:** An audit timeline is generated detailing every step and shloka rationale.

### 2. Computational Complexity
* **Time Complexity:** $\mathcal{O}(n)$, where $n = 8$ (number of questions). Each fact is looked up in a hash dictionary in $\mathcal{O}(1)$ constant time.
* **Space Complexity:** $\mathcal{O}(n)$ to store working memory scores (3 counters) and $n$ explanation audit records.

### 3. Deterministic Tie-Breaking Policy
When two or three Doshas obtain identical top scores (e.g., 4 Vata, 4 Pitta, 0 Kapha), the engine resolves the tie deterministically using dictionary precedence order:
$$\text{Priority: } \text{Vata (वात)} > \text{Pitta (पित्त)} > \text{Kapha (कफ)}$$
The tie condition is transparently reported to the user in the audit output.

---

## 📂 Project Structure

```
├── app.py                      # Flask backend application and routing
├── rules.py                    # Classical Ayurvedic Knowledge Base (Python)
├── expert_engine.py            # Forward-chaining inference engine (Python)
├── requirements.txt            # Python dependencies (Flask, etc.)
├── tests/
│   └── test_expert_engine.py   # Academic test suite (TC01 to TC15)
├── templates/                  # Jinja2 Flask templates
│   ├── base.html               # Global layout, typography, navigation
│   ├── index.html              # Homepage with Tridosha & pipeline visual
│   ├── assessment.html         # 8-question step-by-step wizard
│   ├── result.html             # Result dashboard, score bars, rule inspector
│   ├── how-it-works.html       # Detailed 8-step pipeline breakdown
│   └── about.html              # Academic thesis & IKS context
├── static/
│   ├── css/style.css           # Custom styling and print media rules
│   └── js/
│       ├── main.js             # General navigation script
│       └── assessment.js       # Wizard validation & step transitions
├── src/                        # Modern React + Vite Single-Page Application
│   ├── rules.ts                # TypeScript knowledge base
│   ├── expert_engine.ts        # TypeScript forward-chaining engine
│   ├── components/
│   │   ├── Navbar.tsx          # Editorial navigation with Sanskrit symbol
│   │   ├── Hero.tsx            # Hero section with interactive pipeline
│   │   ├── DoshasSection.tsx   # Tridosha cards with classical attributes
│   │   ├── SystemThinkingSection.tsx # How the system thinks step visual
│   │   ├── IksCsMapping.tsx    # IKS × CS comparison & hierarchy
│   │   ├── AssessmentWizard.tsx# 8-question wizard with keyboard shortcuts
│   │   ├── ResultView.tsx      # Results, score bars, & Rule Inspector
│   │   ├── HowItWorksView.tsx  # Interactive educational pipeline
│   │   ├── AboutView.tsx       # Viva preparation guide & complexity
│   │   └── Footer.tsx          # Academic footer
│   ├── App.tsx                 # Root application controller
│   └── main.tsx                # React entry point
└── metadata.json               # Application metadata
```

---

## 🧪 Verification & Test Suite

The inference engine includes 15 academic test cases (`tests/test_expert_engine.py`):

| Test Case | Scenario | Expected Outcome | Result |
| :--- | :--- | :--- | :--- |
| **TC01** | Pure Vata (8 Vata responses) | Vata: 8, Pitta: 0, Kapha: 0 → Dominant: Vata | ✅ Pass |
| **TC02** | Pure Pitta (8 Pitta responses) | Vata: 0, Pitta: 8, Kapha: 0 → Dominant: Pitta | ✅ Pass |
| **TC03** | Pure Kapha (8 Kapha responses) | Vata: 0, Pitta: 0, Kapha: 8 → Dominant: Kapha | ✅ Pass |
| **TC04** | Balanced Majority Vata (4V, 2P, 2K) | Vata: 4, Pitta: 2, Kapha: 2 → Dominant: Vata | ✅ Pass |
| **TC05** | Balanced Majority Pitta (2V, 4P, 2K) | Vata: 2, Pitta: 4, Kapha: 2 → Dominant: Pitta | ✅ Pass |
| **TC06** | Balanced Majority Kapha (2V, 2P, 4K) | Vata: 2, Pitta: 2, Kapha: 4 → Dominant: Kapha | ✅ Pass |
| **TC07** | Tie Vata vs Pitta (4V, 4P, 0K) | Vata: 4, Pitta: 4 → Dominant: Vata (Priority) | ✅ Pass |
| **TC08** | Tie Vata vs Kapha (4V, 0P, 4K) | Vata: 4, Kapha: 4 → Dominant: Vata (Priority) | ✅ Pass |
| **TC09** | Tie Pitta vs Kapha (0V, 4P, 4K) | Pitta: 4, Kapha: 4 → Dominant: Pitta (Priority) | ✅ Pass |
| **TC10** | Complete Three-Way Tie (2V, 3P, 3K) | Pitta: 3, Kapha: 3 → Dominant: Pitta | ✅ Pass |
| **TC11** | Total Score Invariant | Sum of all Doshas always equals 8 | ✅ Pass |
| **TC12** | Explanation Trace Audit | Generates exactly 8 sequential trace records | ✅ Pass |
| **TC13** | Validation: Missing Question | Raises `ValidationError` on incomplete input | ✅ Pass |
| **TC14** | Validation: Unknown Option | Raises `ValidationError` on invalid token | ✅ Pass |
| **TC15** | Validation: Case Insensitivity | Accepts uppercase/mixed input (`VATA`, `Pitta`) | ✅ Pass |

Run test suite:
```bash
python3 -m unittest tests/test_expert_engine.py
```

---

## 🎓 Academic Review & Viva Defense Q&A

**Q1: What distinguishes an Expert System from Machine Learning?**
> *Answer:* An Expert System relies on explicitly curated, deterministic domain rules formulated by human subject-matter experts (knowledge engineers). Unlike statistical machine learning, which infers patterns probabilistically from training data and often behaves as a black box, an expert system provides 100% explainability and mathematical determinism.

**Q2: What is Forward Chaining?**
> *Answer:* Forward chaining is a data-driven reasoning strategy where the inference engine begins with known facts (the user's asserted characteristics) and iteratively evaluates matching IF conditions in the rule base to fire consequent actions until a goal state (the dominant Prakriti) is reached.

**Q3: How are ties handled?**
> *Answer:* Ties are handled through a deterministic priority order ($Vata > Pitta > Kapha$) specified in the academic project requirements, preventing arbitrary or unpredictable system behavior.

---

## ⚠️ Non-Medical Academic Disclaimer

This software application is developed strictly for **academic and educational demonstration purposes** within an Indian Knowledge Systems (IKS) and Computer Science collegiate curriculum. **It does not provide medical advice, diagnosis, treatment, or medicinal prescriptions.** For clinical health assessments or therapeutic treatments, always consult a certified Ayurvedic practitioner or qualified physician.
#   i k s - p r o j e c t  
 