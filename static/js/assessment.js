/**
 * Prakriti Expert System - Assessment Wizard
 * Manages the step-by-step 8-question interface, active state,
 * validation, and progress animation.
 */

document.addEventListener("DOMContentLoaded", () => {
    const steps = Array.from(document.querySelectorAll(".question-step"));
    if (!steps.length) return;

    let currentStepIndex = 0;
    const totalSteps = steps.length;

    const progressBarFill = document.getElementById("progress-bar-fill");
    const questionIndicator = document.getElementById("question-indicator");
    const progressPercentage = document.getElementById("progress-percentage");
    const errorBox = document.getElementById("client-error-box");
    const form = document.getElementById("assessment-form");

    function updateStepUI() {
        steps.forEach((step, idx) => {
            if (idx === currentStepIndex) {
                step.classList.remove("hidden");
                step.setAttribute("aria-hidden", "false");
            } else {
                step.classList.add("hidden");
                step.setAttribute("aria-hidden", "true");
            }
        });

        // Update progress indicators
        const currentStepNum = currentStepIndex + 1;
        const progressPct = Math.round((currentStepNum / totalSteps) * 100);

        if (questionIndicator) {
            questionIndicator.textContent = `Question ${currentStepNum} of ${totalSteps}`;
        }
        if (progressPercentage) {
            progressPercentage.textContent = `${progressPct}% Completed`;
        }
        if (progressBarFill) {
            progressBarFill.style.width = `${progressPct}%`;
        }

        // Hide any previous error messages
        if (errorBox) {
            errorBox.classList.add("hidden");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function isStepAnswered(stepIdx) {
        const step = steps[stepIdx];
        const qid = step.getAttribute("data-qid");
        const checked = step.querySelector(`input[name="${qid}"]:checked`);
        return !!checked;
    }

    // Attach Next button listeners
    document.querySelectorAll(".next-step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (!isStepAnswered(currentStepIndex)) {
                if (errorBox) {
                    errorBox.textContent = "Please select an answer to continue to the next question.";
                    errorBox.classList.remove("hidden");
                }
                return;
            }

            if (currentStepIndex < totalSteps - 1) {
                currentStepIndex++;
                updateStepUI();
            }
        });
    });

    // Attach Previous button listeners
    document.querySelectorAll(".prev-step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                updateStepUI();
            }
        });
    });

    // Auto-advance or visual selection on clicking option
    document.querySelectorAll(".option-card").forEach(card => {
        card.addEventListener("click", () => {
            if (errorBox) {
                errorBox.classList.add("hidden");
            }
        });
    });

    // Form submission validation
    if (form) {
        form.addEventListener("submit", (e) => {
            for (let i = 0; i < totalSteps; i++) {
                if (!isStepAnswered(i)) {
                    e.preventDefault();
                    currentStepIndex = i;
                    updateStepUI();
                    if (errorBox) {
                        errorBox.textContent = "Please answer all 8 questions before running the expert inference.";
                        errorBox.classList.remove("hidden");
                    }
                    return;
                }
            }
        });
    }

    // Keyboard support: Enter key advances if answered
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.target.matches("textarea, button")) {
            const currentStep = steps[currentStepIndex];
            const nextBtn = currentStep.querySelector(".next-step-btn");
            if (nextBtn && isStepAnswered(currentStepIndex)) {
                e.preventDefault();
                nextBtn.click();
            }
        }
    });

    // Initial render
    updateStepUI();
});
