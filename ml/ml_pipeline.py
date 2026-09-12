# ============================================================
# MODULE 3 - MACHINE LEARNING CAREER RECOMMENDATION PIPELINE
# ============================================================
#
# Input:
#   synthetic_students.csv
#
# Output:
#   processed/career_model.joblib
#   processed/feature_names.joblib
#   processed/career_labels.joblib
#   processed/model_metrics.json
#   processed/feature_importance.csv
#
# Model:
#   Random Forest Classifier
#
# Purpose:
#   Predict the student's career interest based on:
#       - Technical skills
#       - Programming languages
#       - Soft skills
#       - Technical rating
#       - Soft skill rating
#       - Projects
#       - Project count
#       - Year
#       - Current course
#
# ============================================================

import os
import json
import warnings
import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import (
    MultiLabelBinarizer,
    OneHotEncoder
)
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    precision_score,
    recall_score,
    f1_score
)

warnings.filterwarnings("ignore")


# ============================================================
# CONFIGURATION
# ============================================================

DATA_PATH = "./synthetic_students.csv"
OUTPUT_DIR = "./processed"

RANDOM_STATE = 42
TEST_SIZE = 0.20

MODEL_PATH = os.path.join(
    OUTPUT_DIR,
    "career_model.joblib"
)

FEATURE_NAMES_PATH = os.path.join(
    OUTPUT_DIR,
    "feature_names.joblib"
)

CAREER_LABELS_PATH = os.path.join(
    OUTPUT_DIR,
    "career_labels.joblib"
)

PREPROCESSOR_PATH = os.path.join(
    OUTPUT_DIR,
    "preprocessing.joblib"
)

METRICS_PATH = os.path.join(
    OUTPUT_DIR,
    "model_metrics.json"
)

FEATURE_IMPORTANCE_PATH = os.path.join(
    OUTPUT_DIR,
    "feature_importance.csv"
)

CONFUSION_MATRIX_PATH = os.path.join(
    OUTPUT_DIR,
    "confusion_matrix.csv"
)


# ============================================================
# 1. LOAD DATA
# ============================================================

def load_data():

    print("\n" + "=" * 60)
    print("1. LOADING DATA")
    print("=" * 60)

    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(
            f"Dataset not found: {DATA_PATH}"
        )

    df = pd.read_csv(DATA_PATH)

    print(f"Dataset shape: {df.shape[0]} rows × {df.shape[1]} columns")

    return df


# ============================================================
# 2. VALIDATE DATASET
# ============================================================

def validate_dataset(df):

    print("\n" + "=" * 60)
    print("2. DATASET VALIDATION")
    print("=" * 60)

    required_columns = [
        "student_id",
        "name",
        "email",
        "year",
        "current_course",
        "technical_skills",
        "programming_languages",
        "technical_rating",
        "soft_skills",
        "soft_skill_rating",
        "projects",
        "project_count",
        "career_interest",
        "challenges",
        "support_required"
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing required columns: {missing_columns}"
        )

    # Missing values
    missing_values = df.isnull().sum()

    if missing_values.sum() == 0:
        print("✓ No missing values")
    else:
        print("Missing values:")
        print(
            missing_values[
                missing_values > 0
            ]
        )

    # Duplicate records
    duplicate_rows = df.duplicated().sum()

    print(f"Duplicate rows: {duplicate_rows}")

    # Student ID
    duplicate_ids = df["student_id"].duplicated().sum()

    print(f"Duplicate student IDs: {duplicate_ids}")

    # Email
    duplicate_emails = df["email"].duplicated().sum()

    print(f"Duplicate emails: {duplicate_emails}")

    # Project consistency
    invalid_projects = df[
        (
            (df["projects"] == "No") &
            (df["project_count"] != 0)
        )
        |
        (
            (df["projects"] == "Yes") &
            (df["project_count"] <= 0)
        )
    ]

    print(
        f"Invalid project records: {len(invalid_projects)}"
    )

    # Target distribution
    print("\nCareer distribution:")

    print(
        df["career_interest"]
        .value_counts()
        .to_string()
    )

    # Rating validation
    invalid_technical_rating = (
        ~df["technical_rating"].between(1, 5)
    ).sum()

    invalid_soft_rating = (
        ~df["soft_skill_rating"].between(1, 5)
    ).sum()

    print(
        f"\nInvalid technical ratings: "
        f"{invalid_technical_rating}"
    )

    print(
        f"Invalid soft-skill ratings: "
        f"{invalid_soft_rating}"
    )


# ============================================================
# 3. CONVERT MULTI-VALUE COLUMNS
# ============================================================

def split_values(value):

    if pd.isna(value):
        return []

    return [
        item.strip().lower()
        for item in str(value).split(",")
        if item.strip()
    ]


def prepare_dataframe(df):

    print("\n" + "=" * 60)
    print("3. PREPARING FEATURES")
    print("=" * 60)

    df = df.copy()

    # Convert multi-value columns
    df["technical_skills"] = (
        df["technical_skills"]
        .apply(split_values)
    )

    df["programming_languages"] = (
        df["programming_languages"]
        .apply(split_values)
    )

    df["soft_skills"] = (
        df["soft_skills"]
        .apply(split_values)
    )

    # Normalize projects
    df["projects"] = (
        df["projects"]
        .astype(str)
        .str.strip()
        .str.lower()
    )

    df["projects"] = (
        df["projects"]
        .map({
            "yes": 1,
            "no": 0
        })
    )

    # Numeric conversions
    numeric_columns = [
        "year",
        "technical_rating",
        "soft_skill_rating",
        "project_count"
    ]

    for column in numeric_columns:

        df[column] = pd.to_numeric(
            df[column],
            errors="coerce"
        )

    return df


# ============================================================
# 4. MULTI-LABEL ENCODING
# ============================================================

def fit_multilabel_encoder(
    train_values,
    test_values,
    name
):

    encoder = MultiLabelBinarizer()

    train_encoded = encoder.fit_transform(
        train_values
    )

    test_encoded = encoder.transform(
        test_values
    )

    print(
        f"{name}: "
        f"{len(encoder.classes_)} features"
    )

    return (
        encoder,
        train_encoded,
        test_encoded
    )


# ============================================================
# 5. ONE-HOT ENCODE COURSE
# ============================================================

def fit_course_encoder(
    train_values,
    test_values
):

    encoder = OneHotEncoder(
        handle_unknown="ignore",
        sparse_output=False
    )

    train_array = np.array(
        train_values
    ).reshape(-1, 1)

    test_array = np.array(
        test_values
    ).reshape(-1, 1)

    train_encoded = encoder.fit_transform(
        train_array
    )

    test_encoded = encoder.transform(
        test_array
    )

    print(
        f"Current course: "
        f"{len(encoder.categories_[0])} features"
    )

    return (
        encoder,
        train_encoded,
        test_encoded
    )


# ============================================================
# 6. BUILD FEATURE MATRIX
# ============================================================

def build_features(
    train_df,
    test_df
):

    print("\n" + "=" * 60)
    print("4. FEATURE ENGINEERING")
    print("=" * 60)

    feature_blocks_train = []
    feature_blocks_test = []

    feature_names = []

    encoders = {}

    # --------------------------------------------------------
    # TECHNICAL SKILLS
    # --------------------------------------------------------

    (
        technical_encoder,
        technical_train,
        technical_test
    ) = fit_multilabel_encoder(
        train_df["technical_skills"],
        test_df["technical_skills"],
        "Technical skills"
    )

    encoders["technical_skills"] = technical_encoder

    feature_blocks_train.append(
        technical_train
    )

    feature_blocks_test.append(
        technical_test
    )

    feature_names.extend(
        [
            f"technical_skill_{skill}"
            for skill in technical_encoder.classes_
        ]
    )

    # --------------------------------------------------------
    # PROGRAMMING LANGUAGES
    # --------------------------------------------------------

    (
        programming_encoder,
        programming_train,
        programming_test
    ) = fit_multilabel_encoder(
        train_df["programming_languages"],
        test_df["programming_languages"],
        "Programming languages"
    )

    encoders["programming_languages"] = (
        programming_encoder
    )

    feature_blocks_train.append(
        programming_train
    )

    feature_blocks_test.append(
        programming_test
    )

    feature_names.extend(
        [
            f"programming_language_{language}"
            for language in programming_encoder.classes_
        ]
    )

    # --------------------------------------------------------
    # SOFT SKILLS
    # --------------------------------------------------------

    (
        soft_encoder,
        soft_train,
        soft_test
    ) = fit_multilabel_encoder(
        train_df["soft_skills"],
        test_df["soft_skills"],
        "Soft skills"
    )

    encoders["soft_skills"] = soft_encoder

    feature_blocks_train.append(
        soft_train
    )

    feature_blocks_test.append(
        soft_test
    )

    feature_names.extend(
        [
            f"soft_skill_{skill}"
            for skill in soft_encoder.classes_
        ]
    )

    # --------------------------------------------------------
    # CURRENT COURSE
    # --------------------------------------------------------

    (
        course_encoder,
        course_train,
        course_test
    ) = fit_course_encoder(
        train_df["current_course"],
        test_df["current_course"]
    )

    encoders["current_course"] = course_encoder

    feature_blocks_train.append(
        course_train
    )

    feature_blocks_test.append(
        course_test
    )

    feature_names.extend(
        [
            f"course_{course}"
            for course in course_encoder.categories_[0]
        ]
    )

    # --------------------------------------------------------
    # NUMERIC FEATURES
    # --------------------------------------------------------

    numeric_columns = [
        "year",
        "technical_rating",
        "soft_skill_rating",
        "projects",
        "project_count"
    ]

    numeric_imputer = SimpleImputer(
        strategy="median"
    )

    numeric_train = numeric_imputer.fit_transform(
        train_df[numeric_columns]
    )

    numeric_test = numeric_imputer.transform(
        test_df[numeric_columns]
    )

    encoders["numeric_imputer"] = numeric_imputer

    feature_blocks_train.append(
        numeric_train
    )

    feature_blocks_test.append(
        numeric_test
    )

    feature_names.extend(
        numeric_columns
    )

    # --------------------------------------------------------
    # FINAL MATRIX
    # --------------------------------------------------------

    X_train = np.hstack(
        feature_blocks_train
    )

    X_test = np.hstack(
        feature_blocks_test
    )

    print(
        f"\nFinal training matrix: "
        f"{X_train.shape}"
    )

    print(
        f"Final testing matrix: "
        f"{X_test.shape}"
    )

    print(
        f"Total features: "
        f"{len(feature_names)}"
    )

    return (
        X_train,
        X_test,
        feature_names,
        encoders
    )


# ============================================================
# 7. TRAIN MODEL
# ============================================================

def train_model(X_train, y_train):

    print("\n" + "=" * 60)
    print("5. TRAINING MODEL")
    print("=" * 60)

    model = RandomForestClassifier(
        n_estimators=500,
        max_depth=None,
        min_samples_split=4,
        min_samples_leaf=2,
        class_weight="balanced",
        random_state=RANDOM_STATE,
        n_jobs=-1
    )

    model.fit(
        X_train,
        y_train
    )

    print("✓ Random Forest training completed")

    return model


# ============================================================
# 8. EVALUATE MODEL
# ============================================================

def evaluate_model(
    model,
    X_test,
    y_test,
    career_labels
):

    print("\n" + "=" * 60)
    print("6. MODEL EVALUATION")
    print("=" * 60)

    predictions = model.predict(
        X_test
    )

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    precision = precision_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    recall = recall_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    f1 = f1_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    print(
        f"\nAccuracy : {accuracy:.4f}"
    )

    print(
        f"Precision: {precision:.4f}"
    )

    print(
        f"Recall   : {recall:.4f}"
    )

    print(
        f"F1 Score : {f1:.4f}"
    )

    # --------------------------------------------------------
    # CLASSIFICATION REPORT
    # --------------------------------------------------------

    print("\nClassification Report:\n")

    report = classification_report(
        y_test,
        predictions,
        target_names=career_labels,
        zero_division=0
    )

    print(report)

    # --------------------------------------------------------
    # CONFUSION MATRIX
    # --------------------------------------------------------

    matrix = confusion_matrix(
        y_test,
        predictions,
        labels=career_labels
    )

    confusion_df = pd.DataFrame(
        matrix,
        index=career_labels,
        columns=career_labels
    )

    print("\nConfusion Matrix:\n")
    print(confusion_df)

    confusion_df.to_csv(
        CONFUSION_MATRIX_PATH
    )

    metrics = {
        "accuracy": float(accuracy),
        "precision_weighted": float(precision),
        "recall_weighted": float(recall),
        "f1_weighted": float(f1),
        "test_samples": int(len(y_test)),
        "number_of_classes": int(len(career_labels)),
        "career_labels": career_labels
    }

    with open(
        METRICS_PATH,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            metrics,
            file,
            indent=4
        )

    return metrics


# ============================================================
# 9. FEATURE IMPORTANCE
# ============================================================

def save_feature_importance(
    model,
    feature_names
):

    print("\n" + "=" * 60)
    print("7. FEATURE IMPORTANCE")
    print("=" * 60)

    importance = model.feature_importances_

    importance_df = pd.DataFrame({
        "feature": feature_names,
        "importance": importance
    })

    importance_df = (
        importance_df
        .sort_values(
            "importance",
            ascending=False
        )
        .reset_index(drop=True)
    )

    print(
        "\nTop 20 features:\n"
    )

    print(
        importance_df.head(20)
        .to_string(index=False)
    )

    importance_df.to_csv(
        FEATURE_IMPORTANCE_PATH,
        index=False
    )

    return importance_df


# ============================================================
# 10. SAVE MODEL
# ============================================================

def save_artifacts(
    model,
    feature_names,
    career_labels,
    encoders
):

    print("\n" + "=" * 60)
    print("8. SAVING MODEL")
    print("=" * 60)

    os.makedirs(
        OUTPUT_DIR,
        exist_ok=True
    )

    joblib.dump(
        model,
        MODEL_PATH
    )

    joblib.dump(
        feature_names,
        FEATURE_NAMES_PATH
    )

    joblib.dump(
        career_labels,
        CAREER_LABELS_PATH
    )

    joblib.dump(
        encoders,
        PREPROCESSOR_PATH
    )

    print(
        f"✓ Model saved to: {MODEL_PATH}"
    )

    print(
        f"✓ Features saved to: {FEATURE_NAMES_PATH}"
    )

    print(
        f"✓ Career labels saved to: {CAREER_LABELS_PATH}"
    )

    print(
        f"✓ Preprocessing saved to: {PREPROCESSOR_PATH}"
    )


# ============================================================
# 11. PREPARE SINGLE STUDENT FOR PREDICTION
# ============================================================

def prepare_single_student(
    student,
    encoders,
    feature_names
):

    feature_blocks = []

    # --------------------------------------------------------
    # TECHNICAL SKILLS
    # --------------------------------------------------------

    technical_skills = split_values(
        student.get(
            "technical_skills",
            ""
        )
    )

    technical_encoded = (
        encoders["technical_skills"]
        .transform([technical_skills])
    )

    feature_blocks.append(
        technical_encoded
    )

    # --------------------------------------------------------
    # PROGRAMMING LANGUAGES
    # --------------------------------------------------------

    programming_languages = split_values(
        student.get(
            "programming_languages",
            ""
        )
    )

    programming_encoded = (
        encoders["programming_languages"]
        .transform(
            [programming_languages]
        )
    )

    feature_blocks.append(
        programming_encoded
    )

    # --------------------------------------------------------
    # SOFT SKILLS
    # --------------------------------------------------------

    soft_skills = split_values(
        student.get(
            "soft_skills",
            ""
        )
    )

    soft_encoded = (
        encoders["soft_skills"]
        .transform([soft_skills])
    )

    feature_blocks.append(
        soft_encoded
    )

    # --------------------------------------------------------
    # CURRENT COURSE
    # --------------------------------------------------------

    course = student.get(
        "current_course",
        ""
    )

    course_encoded = (
        encoders["current_course"]
        .transform(
            [[course]]
        )
    )

    feature_blocks.append(
        course_encoded
    )

    # --------------------------------------------------------
    # NUMERIC FEATURES
    # --------------------------------------------------------

    projects = student.get(
        "projects",
        0
    )

    if isinstance(projects, str):

        projects = (
            1
            if projects.strip().lower() == "yes"
            else 0
        )

    numeric_values = pd.DataFrame(
        [[
            student.get("year", np.nan),
            student.get(
                "technical_rating",
                np.nan
            ),
            student.get(
                "soft_skill_rating",
                np.nan
            ),
            projects,
            student.get(
                "project_count",
                np.nan
            )
        ]],
        columns=[
            "year",
            "technical_rating",
            "soft_skill_rating",
            "projects",
            "project_count"
        ]
    )

    numeric_encoded = (
        encoders["numeric_imputer"]
        .transform(numeric_values)
    )

    feature_blocks.append(
        numeric_encoded
    )

    # --------------------------------------------------------
    # FINAL FEATURE VECTOR
    # --------------------------------------------------------

    X = np.hstack(
        feature_blocks
    )

    return X


# ============================================================
# 12. PREDICT CAREER
# ============================================================

def predict_career(student):

    model = joblib.load(
        MODEL_PATH
    )

    encoders = joblib.load(
        PREPROCESSOR_PATH
    )

    career_labels = joblib.load(
        CAREER_LABELS_PATH
    )

    feature_names = joblib.load(
        FEATURE_NAMES_PATH
    )

    X = prepare_single_student(
        student,
        encoders,
        feature_names
    )

    probabilities = (
        model.predict_proba(X)[0]
    )

    # Sort careers by probability
    ranking = sorted(
        zip(
            career_labels,
            probabilities
        ),
        key=lambda x: x[1],
        reverse=True
    )

    results = []

    for career, probability in ranking:

        results.append({
            "career": career,
            "probability": round(
                float(probability) * 100,
                2
            )
        })

    return results


# ============================================================
# 13. MAIN TRAINING PIPELINE
# ============================================================

def main():

    print("\n")
    print("=" * 60)
    print("   SIH CAREER RECOMMENDATION ML PIPELINE")
    print("=" * 60)

    # --------------------------------------------------------
    # CREATE OUTPUT DIRECTORY
    # --------------------------------------------------------

    os.makedirs(
        OUTPUT_DIR,
        exist_ok=True
    )

    # --------------------------------------------------------
    # LOAD DATA
    # --------------------------------------------------------

    df = load_data()

    # --------------------------------------------------------
    # VALIDATE
    # --------------------------------------------------------

    validate_dataset(df)

    # --------------------------------------------------------
    # PREPARE
    # --------------------------------------------------------

    df = prepare_dataframe(df)

    # --------------------------------------------------------
    # TARGET
    # --------------------------------------------------------

    y = df[
        "career_interest"
    ].values

    # --------------------------------------------------------
    # FEATURES
    #
    # IMPORTANT:
    #
    # We intentionally DO NOT use:
    #
    # student_id
    # name
    # email
    # challenges
    # support_required
    #
    # These are either identifiers or free-text fields
    # that are not currently part of our career classifier.
    # --------------------------------------------------------

    feature_columns = [
        "technical_skills",
        "programming_languages",
        "technical_rating",
        "soft_skills",
        "soft_skill_rating",
        "projects",
        "project_count",
        "year",
        "current_course"
    ]

    X_df = df[
        feature_columns
    ].copy()

    # --------------------------------------------------------
    # TRAIN / TEST SPLIT
    #
    # VERY IMPORTANT:
    #
    # We split BEFORE fitting encoders.
    #
    # This prevents preprocessing leakage.
    # --------------------------------------------------------

    (
        train_df,
        test_df,
        y_train,
        y_test
    ) = train_test_split(
        X_df,
        y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
        stratify=y
    )

    print("\n")
    print(
        f"Training samples: {len(train_df)}"
    )

    print(
        f"Testing samples : {len(test_df)}"
    )

    # --------------------------------------------------------
    # FEATURE ENGINEERING
    # --------------------------------------------------------

    (
        X_train,
        X_test,
        feature_names,
        encoders
    ) = build_features(
        train_df,
        test_df
    )

    # --------------------------------------------------------
    # TRAIN MODEL
    # --------------------------------------------------------

    model = train_model(
        X_train,
        y_train
    )

    # --------------------------------------------------------
    # EVALUATE
    # --------------------------------------------------------

    metrics = evaluate_model(
        model,
        X_test,
        y_test,
        sorted(
            np.unique(y)
        )
    )

    # --------------------------------------------------------
    # FEATURE IMPORTANCE
    # --------------------------------------------------------

    save_feature_importance(
        model,
        feature_names
    )

    # --------------------------------------------------------
    # SAVE ARTIFACTS
    # --------------------------------------------------------

    save_artifacts(
        model,
        feature_names,
        sorted(
            np.unique(y)
        ),
        encoders
    )

    # --------------------------------------------------------
    # FINISHED
    # --------------------------------------------------------

    print("\n" + "=" * 60)
    print("PIPELINE COMPLETE")
    print("=" * 60)

    print(
        f"\nFinal Accuracy: "
        f"{metrics['accuracy'] * 100:.2f}%"
    )

    print(
        "\nGenerated files:"
    )

    print(
        f"  {MODEL_PATH}"
    )

    print(
        f"  {PREPROCESSOR_PATH}"
    )

    print(
        f"  {FEATURE_NAMES_PATH}"
    )

    print(
        f"  {CAREER_LABELS_PATH}"
    )

    print(
        f"  {METRICS_PATH}"
    )

    print(
        f"  {FEATURE_IMPORTANCE_PATH}"
    )

    print(
        f"  {CONFUSION_MATRIX_PATH}"
    )

    print("\n")


# ============================================================
# RUN TRAINING
# ============================================================

if __name__ == "__main__":

    main()