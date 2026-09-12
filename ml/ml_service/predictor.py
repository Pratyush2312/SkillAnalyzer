import os
import joblib
import numpy as np
import pandas as pd


# ============================================================
# PATH CONFIGURATION
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROCESSED_DIR = os.path.join(BASE_DIR, "processed")

MODEL_PATH = os.path.join(
    PROCESSED_DIR,
    "career_model.joblib"
)

PREPROCESSOR_PATH = os.path.join(
    PROCESSED_DIR,
    "preprocessing.joblib"
)

CAREER_LABELS_PATH = os.path.join(
    PROCESSED_DIR,
    "career_labels.joblib"
)

FEATURE_NAMES_PATH = os.path.join(
    PROCESSED_DIR,
    "feature_names.joblib"
)


# ============================================================
# LOAD MODEL ARTIFACTS
# ============================================================

model = joblib.load('./processed/career_model.joblib')
encoders = joblib.load('./processed/preprocessing.joblib')
career_labels = joblib.load('./processed/career_labels.joblib')
feature_names = joblib.load('./processed/feature_names.joblib')


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def split_values(value):
    """
    Convert comma-separated values into a normalized list.

    Example:
        "Python, SQL, JavaScript"
        becomes:
        ["python", "sql", "javascript"]
    """

    if value is None:
        return []

    if isinstance(value, list):
        return [
            str(item).strip().lower()
            for item in value
            if str(item).strip()
        ]

    if pd.isna(value):
        return []

    return [
        item.strip().lower()
        for item in str(value).split(",")
        if item.strip()
    ]


def filter_known_values(values, encoder):
    """
    Keep only values known by the encoder.

    This prevents prediction errors when a student submits
    a skill or value that was not present during training.
    """

    known_values = set(encoder.classes_)

    return [
        value
        for value in values
        if value in known_values
    ]


# ============================================================
# PREPARE ONE STUDENT FOR PREDICTION
# ============================================================

def prepare_single_student(student):
    """
    Convert one student's profile into the exact feature
    structure expected by the trained Random Forest model.
    """

    feature_blocks = []

    # --------------------------------------------------------
    # TECHNICAL SKILLS
    # --------------------------------------------------------

    technical_skills = split_values(
        student.get("technical_skills", "")
    )

    technical_skills = filter_known_values(
        technical_skills,
        encoders["technical_skills"]
    )

    technical_encoded = encoders[
        "technical_skills"
    ].transform([technical_skills])

    feature_blocks.append(technical_encoded)

    # --------------------------------------------------------
    # PROGRAMMING LANGUAGES
    # --------------------------------------------------------

    programming_languages = split_values(
        student.get("programming_languages", "")
    )

    programming_languages = filter_known_values(
        programming_languages,
        encoders["programming_languages"]
    )

    programming_encoded = encoders[
        "programming_languages"
    ].transform([programming_languages])

    feature_blocks.append(programming_encoded)

    # --------------------------------------------------------
    # SOFT SKILLS
    # --------------------------------------------------------

    soft_skills = split_values(
        student.get("soft_skills", "")
    )

    soft_skills = filter_known_values(
        soft_skills,
        encoders["soft_skills"]
    )

    soft_encoded = encoders[
        "soft_skills"
    ].transform([soft_skills])

    feature_blocks.append(soft_encoded)

    # --------------------------------------------------------
    # CURRENT COURSE
    # --------------------------------------------------------

    course = student.get("current_course", "")

    if course is None:
        course = ""

    course = str(course).strip()

    course_encoded = encoders[
        "current_course"
    ].transform([[course]])

    feature_blocks.append(course_encoded)

    # --------------------------------------------------------
    # NUMERIC FEATURES
    # --------------------------------------------------------

    projects = student.get("projects", 0)

    if isinstance(projects, str):
        projects = (
            1
            if projects.strip().lower() == "yes"
            else 0
        )

    numeric_values = pd.DataFrame(
        [[
            student.get("year", np.nan),
            student.get("technical_rating", np.nan),
            student.get("soft_skill_rating", np.nan),
            projects,
            student.get("project_count", np.nan)
        ]],
        columns=[
            "year",
            "technical_rating",
            "soft_skill_rating",
            "projects",
            "project_count"
        ]
    )

    numeric_encoded = encoders[
        "numeric_imputer"
    ].transform(numeric_values)

    feature_blocks.append(numeric_encoded)

    # --------------------------------------------------------
    # FINAL FEATURE VECTOR
    # --------------------------------------------------------

    X = np.hstack(feature_blocks)

    # Validate feature count before prediction
    if X.shape[1] != len(feature_names):
        raise ValueError(
            f"Feature mismatch: model expects "
            f"{len(feature_names)} features, but received "
            f"{X.shape[1]}"
        )

    return X


# ============================================================
# PREDICT CAREER
# ============================================================

def predict_career(student):
    """
    Predict and rank career recommendations for one student.
    """

    X = prepare_single_student(student)

    probabilities = model.predict_proba(X)[0]

    ranking = sorted(
        zip(
            career_labels,
            probabilities
        ),
        key=lambda item: item[1],
        reverse=True
    )

    results = []

    for career, probability in ranking:
        results.append({
            "career": str(career),
            "probability": round(
                float(probability) * 100,
                2
            )
        })

    return results