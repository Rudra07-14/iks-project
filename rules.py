"""
Ayurvedic Prakriti Classification Knowledge Base
=================================================
Indian Knowledge Systems (IKS) x Computer Science Expert System

This file defines the predefined knowledge base containing facts, questions,
and IF-THEN production rules representing classical Ayurvedic characteristics
for Vata, Pitta, and Kapha Doshas.
"""

QUESTIONS = {
    "q1": {
        "id": "q1",
        "category": "Body Structure",
        "title": "What best describes your natural body frame and structure?",
        "options": {
            "vata": "Light and thin structure, prominent joints, tends to be slender",
            "pitta": "Medium and well-proportioned structure, moderate muscle tone",
            "kapha": "Strong and broad structure, heavy bone frame, solid build"
        }
    },
    "q2": {
        "id": "q2",
        "category": "Appetite",
        "title": "How would you characterize your typical appetite and digestion?",
        "options": {
            "vata": "Irregular and variable appetite; often forgets to eat or feels fluctuating hunger",
            "pitta": "Strong, sharp, and intense appetite; feels irritable if meals are delayed",
            "kapha": "Steady, slow, and moderate appetite; can comfortably skip meals without discomfort"
        }
    },
    "q3": {
        "id": "q3",
        "category": "Activity",
        "title": "What best describes your general physical activity level and pace?",
        "options": {
            "vata": "Highly active, quick-moving, restless, and walks fast",
            "pitta": "Moderate, purposeful, efficient, and goal-directed pace",
            "kapha": "Calm, slow, deliberate, steady, and conserves physical energy"
        }
    },
    "q4": {
        "id": "q4",
        "category": "Routine",
        "title": "How do you naturally approach daily habits and schedules?",
        "options": {
            "vata": "Spontaneous, irregular, and variable daily routine; resists rigid schedules",
            "pitta": "Structured, organized, scheduled, and disciplined; values punctuality",
            "kapha": "Consistent, relaxed, habitual, and dislikes sudden disruptions to routine"
        }
    },
    "q5": {
        "id": "q5",
        "category": "Mental Nature",
        "title": "How does your mind typically process new ideas and memory?",
        "options": {
            "vata": "Quick to grasp new ideas, highly imaginative and creative, but forgets quickly",
            "pitta": "Sharp intellect, analytical, focused, organized, and decisive thinker",
            "kapha": "Calm and thoughtful; takes time to learn but retains knowledge permanently"
        }
    },
    "q6": {
        "id": "q6",
        "category": "Sleep",
        "title": "What best reflects your typical sleep pattern and quality?",
        "options": {
            "vata": "Light, interrupted, variable sleep; light sleeper prone to wakefulness",
            "pitta": "Moderate, sound sleep of 6-7 hours; easily awakened by excessive warmth",
            "kapha": "Deep, heavy, and prolonged sleep; experiences difficulty waking up in the morning"
        }
    },
    "q7": {
        "id": "q7",
        "category": "Response",
        "title": "How do you usually react when confronted with sudden stress or pressure?",
        "options": {
            "vata": "Anxious, fearful, or easily worried; mind races under pressure",
            "pitta": "Irritable, impatient, sharp-tongued, or confrontational when frustrated",
            "kapha": "Calm, unhurried, tolerant, but may withdraw or resist change"
        }
    },
    "q8": {
        "id": "q8",
        "category": "Nature",
        "title": "Which weather conditions or climate do you find least comfortable?",
        "options": {
            "vata": "Dislikes cold, dry, and windy conditions; craves warmth and humidity",
            "pitta": "Dislikes hot weather, direct sunlight, and heat; craves cool breezes",
            "kapha": "Dislikes cold, damp, cloudy, and sluggish weather; prefers warmth and dryness"
        }
    }
}

# Production Rules (IF-THEN structure)
RULES = {
    "q1": {
        "vata": {
            "score": 1,
            "dosha": "Vata",
            "if": "If the person has a light and thin body structure",
            "then": "Increase Vata score by 1",
            "reason": "Classical Ayurveda associates light, lean, and slender physical frames with the airy, mobile qualities of Vata Dosha."
        },
        "pitta": {
            "score": 1,
            "dosha": "Pitta",
            "if": "If the person has a medium and well-proportioned structure",
            "then": "Increase Pitta score by 1",
            "reason": "Classical Ayurveda associates balanced, athletic, and symmetrical physical builds with the fiery, metabolic qualities of Pitta Dosha."
        },
        "kapha": {
            "score": 1,
            "dosha": "Kapha",
            "if": "If the person has a strong and broad structure",
            "then": "Increase Kapha score by 1",
            "reason": "Classical Ayurveda associates sturdy, broad, and dense bone structures with the stable, water-earth qualities of Kapha Dosha."
        }
    },
    "q2": {
        "vata": {
            "score": 1,
            "dosha": "Vata",
            "if": "If appetite and digestion are irregular and fluctuating",
            "then": "Increase Vata score by 1",
            "reason": "Fluctuating digestive fire (Vishama Agni) and erratic hunger are signature characteristics of Vata Dosha."
        },
        "pitta": {
            "score": 1,
            "dosha": "Pitta",
            "if": "If appetite is strong, intense, and cannot tolerate delayed meals",
            "then": "Increase Pitta score by 1",
            "reason": "Intense digestive fire (Tikshna Agni) and strong hunger reflect the transformative heat of Pitta Dosha."
        },
        "kapha": {
            "score": 1,
            "dosha": "Kapha",
            "if": "If appetite is steady, mild, and meal skipping is effortless",
            "then": "Increase Kapha score by 1",
            "reason": "Slow, sustained digestive fire (Manda Agni) and stable appetite reflect the heavy, unhurried nature of Kapha Dosha."
        }
    },
    "q3": {
        "vata": {
            "score": 1,
            "dosha": "Vata",
            "if": "If physical activity is fast-paced, restless, and constantly moving",
            "then": "Increase Vata score by 1",
            "reason": "Rapid movement and restless kinetic energy directly stem from the mobile (Chala) principle of Vata Dosha."
        },
        "pitta": {
            "score": 1,
            "dosha": "Pitta",
            "if": "If physical activity is purposeful, moderate, and driven by goals",
            "then": "Increase Pitta score by 1",
            "reason": "Focused, competitive, and efficient physical execution is characteristic of Pitta Dosha's purposeful heat."
        },
        "kapha": {
            "score": 1,
            "dosha": "Kapha",
            "if": "If physical pace is calm, deliberate, and energy-conserving",
            "then": "Increase Kapha score by 1",
            "reason": "Methodical, unhurried movement and high endurance correspond to the grounding (Sthira) quality of Kapha Dosha."
        }
    },
    "q4": {
        "vata": {
            "score": 1,
            "dosha": "Vata",
            "if": "If daily routine is spontaneous, variable, and non-linear",
            "then": "Increase Vata score by 1",
            "reason": "Variable day-to-day rhythm and preference for spontaneity express the shifting air element of Vata Dosha."
        },
        "pitta": {
            "score": 1,
            "dosha": "Pitta",
            "if": "If daily routine is highly disciplined, structured, and punctual",
            "then": "Increase Pitta score by 1",
            "reason": "Methodical planning, respect for scheduled intervals, and structured execution reflect Pitta's sharp organization."
        },
        "kapha": {
            "score": 1,
            "dosha": "Kapha",
            "if": "If daily routine is steady, predictable, and habit-driven",
            "then": "Increase Kapha score by 1",
            "reason": "Loyalty to established habits and resistance to abrupt lifestyle change correspond to Kapha's steady nature."
        }
    },
    "q5": {
        "vata": {
            "score": 1,
            "dosha": "Vata",
            "if": "If the mind grasps ideas rapidly and creatively, but retains them briefly",
            "then": "Increase Vata score by 1",
            "reason": "Quick intellectual acquisition paired with quick dissipation illustrates the swift movement of Vata."
        },
        "pitta": {
            "score": 1,
            "dosha": "Pitta",
            "if": "If the mind is sharp, analytical, critical, and decisive",
            "then": "Increase Pitta score by 1",
            "reason": "Penetrating intellect, discerning judgment (Medha), and clarity reflect Pitta's illumination (Tejas)."
        },
        "kapha": {
            "score": 1,
            "dosha": "Kapha",
            "if": "If the mind absorbs information patiently and retains it long-term",
            "then": "Increase Kapha score by 1",
            "reason": "Methodical learning paired with deep, unwavering long-term retention represents Kapha's stable foundation."
        }
    },
    "q6": {
        "vata": {
            "score": 1,
            "dosha": "Vata",
            "if": "If sleep is light, easily broken, and prone to disturbance",
            "then": "Increase Vata score by 1",
            "reason": "Shallow, irregular sleep cycles and nocturnal alertness mirror the active nervous system of Vata."
        },
        "pitta": {
            "score": 1,
            "dosha": "Pitta",
            "if": "If sleep is sound, moderate in length, but sensitive to ambient heat",
            "then": "Increase Pitta score by 1",
            "reason": "Moderate, efficient sleep easily interrupted by physiological warmth corresponds to Pitta thermoregulation."
        },
        "kapha": {
            "score": 1,
            "dosha": "Kapha",
            "if": "If sleep is heavy, deep, long, with morning lethargy",
            "then": "Increase Kapha score by 1",
            "reason": "Dense, uninterrupted, heavy slumber (Tandra) is directly governed by Kapha's heavy (Guru) attribute."
        }
    },
    "q7": {
        "vata": {
            "score": 1,
            "dosha": "Vata",
            "if": "If acute stress manifests as anxiety, worry, or restless apprehension",
            "then": "Increase Vata score by 1",
            "reason": "The psychological vulnerability to nervous apprehension and overactive worry stems from agitated Vata."
        },
        "pitta": {
            "score": 1,
            "dosha": "Pitta",
            "if": "If acute stress triggers irritability, frustration, or heated impatience",
            "then": "Increase Pitta score by 1",
            "reason": "Aggressive, argumentative, or fiery emotional outbursts under pressure reflect heightened Pitta heat."
        },
        "kapha": {
            "score": 1,
            "dosha": "Kapha",
            "if": "If acute stress induces emotional withdrawal, complacency, or stubborn resistance",
            "then": "Increase Kapha score by 1",
            "reason": "Protective stoicism, slow emotional escalation, and withdrawal under conflict manifest Kapha inertia."
        }
    },
    "q8": {
        "vata": {
            "score": 1,
            "dosha": "Vata",
            "if": "If the individual is sensitive to cold, dry winds and thrives in warm climates",
            "then": "Increase Vata score by 1",
            "reason": "Vata is intrinsically cold, dry, and mobile (Sheet, Ruksha, Chala); exposure to similar weather causes imbalance."
        },
        "pitta": {
            "score": 1,
            "dosha": "Pitta",
            "if": "If the individual is intolerant to hot weather, strong sunshine, and stifling heat",
            "then": "Increase Pitta score by 1",
            "reason": "Pitta is hot, sharp, and penetrating (Ushna, Tikshna); environmental heat intensifies internal Pitta."
        },
        "kapha": {
            "score": 1,
            "dosha": "Kapha",
            "if": "If the individual is sensitive to damp, cold, and overcast weather",
            "then": "Increase Kapha score by 1",
            "reason": "Kapha is cold, damp, and heavy (Sheet, Snigdha, Guru); rainy and cold climates aggravate Kapha sluggishness."
        }
    }
}

DOSHA_DETAILS = {
    "Vata": {
        "sanskrit": "वात",
        "elements": "Ether (Akasha) + Air (Vayu)",
        "qualities": "Light, dry, mobile, cold, subtle, rough",
        "core_attributes": "Lightness, quickness, variability and movement.",
        "color": "#3B82F6",
        "bg_color": "#EFF6FF",
        "accent": "Airy Blue",
        "badge_class": "bg-blue-50 text-blue-800 border-blue-200",
        "bar_class": "bg-blue-500",
        "summary": "Governs all biological movement, cellular circulation, breathing, and transmission of nerve impulses throughout the physical system."
    },
    "Pitta": {
        "sanskrit": "पित्त",
        "elements": "Fire (Tejas) + Water (Jala)",
        "qualities": "Hot, sharp, light, oily, spreading, liquid",
        "core_attributes": "Heat, intensity, focus and transformation.",
        "color": "#D97706",
        "bg_color": "#FFFBEB",
        "accent": "Warm Amber",
        "badge_class": "bg-amber-50 text-amber-800 border-amber-200",
        "bar_class": "bg-amber-500",
        "summary": "Governs metabolism, enzymatic transformation, digestion, temperature regulation, and intellectual discernment."
    },
    "Kapha": {
        "sanskrit": "कफ",
        "elements": "Water (Jala) + Earth (Prithvi)",
        "qualities": "Heavy, slow, steady, solid, cold, soft",
        "core_attributes": "Stability, heaviness, calmness and steadiness.",
        "color": "#059669",
        "bg_color": "#ECFDF5",
        "accent": "Earthy Forest",
        "badge_class": "bg-emerald-50 text-emerald-800 border-emerald-200",
        "bar_class": "bg-emerald-600",
        "summary": "Provides physical structural integrity, anabolic lubrication, tissue cohesion, biological immunity, and psychological composure."
    }
}
