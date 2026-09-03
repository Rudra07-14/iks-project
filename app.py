"""
Ayurvedic Prakriti Rule-Based Expert System Web Application
===========================================================
Indian Knowledge Systems (IKS) x Computer Science Expert System

Flask Web Server Implementation providing academic routing,
form validation, session caching, and JSON API capabilities.
"""

import os
import json
from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash,
    jsonify,
    Response
)
from expert_engine import evaluate_assessment, ValidationError
from rules import QUESTIONS, RULES, DOSHA_DETAILS

app = Flask(__name__)
# Secret key for session management
app.secret_key = os.environ.get("SECRET_KEY", "prakriti-iks-cs-expert-system-key-2026")


@app.context_processor
def inject_global_context():
    """Injects core Ayurvedic and CS metadata across all Jinja2 templates."""
    return {
        "dosha_details": DOSHA_DETAILS,
        "questions_data": QUESTIONS,
        "total_questions": len(QUESTIONS)
    }


@app.route("/")
def index():
    """Home page: Hero, Three Doshas, Inference pipeline, IKS x CS comparison."""
    return render_template("index.html")


@app.route("/how-it-works")
def how_it_works():
    """Dedicated educational page explaining the 8-step inference engine and CS mapping."""
    return render_template("how-it-works.html")


@app.route("/about")
def about():
    """Academic background, research purpose, algorithmic complexity, limitations."""
    return render_template("about.html")


@app.route("/assessment", methods=["GET", "POST"])
def assessment():
    """
    Assessment route:
    - GET: Displays the 8-question step-by-step assessment.
    - POST: Validates input, evaluates rules, stores result in session, redirects to /result.
    """
    if request.method == "POST":
        # Handle either form-encoded data or JSON
        if request.is_json:
            user_answers = request.get_json() or {}
        else:
            user_answers = {
                qid: request.form.get(qid, "").strip().lower()
                for qid in QUESTIONS.keys()
            }

        try:
            result = evaluate_assessment(user_answers)
            # Store in session for result page display
            session["assessment_result"] = result
            session.modified = True

            if request.is_json:
                return jsonify({"status": "success", "redirect": url_for("result")})
            return redirect(url_for("result"))

        except ValidationError as e:
            if request.is_json:
                return jsonify({"status": "error", "message": str(e)}), 400
            flash(str(e), "error")
            return render_template("assessment.html", questions=QUESTIONS, user_answers=user_answers)
        except Exception as e:
            if request.is_json:
                return jsonify({"status": "error", "message": "Internal inference error."}), 500
            flash("An unexpected evaluation error occurred. Please verify your responses.", "error")
            return render_template("assessment.html", questions=QUESTIONS, user_answers=user_answers)

    # GET request
    return render_template("assessment.html", questions=QUESTIONS, user_answers={})


@app.route("/result")
def result():
    """
    Result route:
    Displays the evaluated Dominant Dosha, score breakdown, explanation timeline,
    and rule inspector. If no session exists, safely redirects to /assessment.
    """
    res = session.get("assessment_result")
    if not res:
        flash("No completed assessment found. Please complete the 8 questions first.", "info")
        return redirect(url_for("assessment"))

    return render_template("result.html", result=res)


@app.route("/api/evaluate", methods=["POST"])
def api_evaluate():
    """REST API endpoint for programmatic evaluation of user facts."""
    payload = request.get_json(silent=True)
    if not payload:
        return jsonify({"error": "Invalid JSON request payload."}), 400

    try:
        res = evaluate_assessment(payload)
        return jsonify(res), 200
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Evaluation failure: {str(e)}"}), 500


@app.route("/api/rules", methods=["GET"])
def api_rules():
    """Returns the full knowledge base, questions, and Dosha metadata."""
    return jsonify({
        "questions": QUESTIONS,
        "rules": RULES,
        "doshas": DOSHA_DETAILS
    }), 200


@app.errorhandler(404)
def not_found_error(error):
    return render_template("base.html", error_title="Page Not Found", error_msg="The requested page could not be located."), 404


@app.errorhandler(500)
def internal_error(error):
    return render_template("base.html", error_title="Internal System Error", error_msg="The rule engine encountered an unexpected condition."), 500


if __name__ == "__main__":
    # Standard local execution for Python development
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
