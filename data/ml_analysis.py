import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
# -------------------------
# 1. Load dataset
# -------------------------

df = pd.read_excel("./DMA DATASET.xlsx")


# -------------------------
# 2. Clean dataset
# -------------------------

df.columns = [column.strip() for column in df.columns]

df = df.drop(columns=["Unnamed: 13"])


# -------------------------
# 3. Select ML data
# -------------------------

features = [
    "Technical Skills",
    "Programming Languages",
    "Rating",
    "Soft Skills",
    "Rating.1",
    "Projects"
]

target = "Career Interest"

ml_df = df[features + [target]].copy()


# -------------------------
# 4. Convert skill strings to lists
# -------------------------

def split_skills(skills):
    return [
        skill.strip().lower()
        for skill in skills.split(",")
    ]


ml_df["Technical Skills"] = (
    ml_df["Technical Skills"].apply(split_skills)
)

ml_df["Programming Languages"] = (
    ml_df["Programming Languages"].apply(split_skills)
)

ml_df["Soft Skills"] = (
    ml_df["Soft Skills"].apply(split_skills)
)


# -------------------------
# 5. Check result
# -------------------------

# print(ml_df.head())
# print("\nShape:", ml_df.shape)

technical_mlb = MultiLabelBinarizer()
programming_mlb = MultiLabelBinarizer()
soft_mlb = MultiLabelBinarizer()

# -------------------------
# 6. Encode skills
# -------------------------

technical_encoded = technical_mlb.fit_transform(
    ml_df["Technical Skills"]
)

programming_encoded = programming_mlb.fit_transform(
    ml_df["Programming Languages"]
)

soft_encoded = soft_mlb.fit_transform(
    ml_df["Soft Skills"]
)

# print("\nTechnical features:")
# print(technical_mlb.classes_)
# print("Shape:", technical_encoded.shape)

# print("\nProgramming features:")
# print(programming_mlb.classes_)
# print("Shape:", programming_encoded.shape)

# print("\nSoft skill features:")
# print(soft_mlb.classes_)
# print("Shape:", soft_encoded.shape)

ml_df["Projects"] = (
    ml_df["Projects"]
    .str.strip()
    .str.lower()
    .map({
        "yes": 1,
        "no": 0
    })
)

# print("\nAfter project conversion:")
# print(
#     ml_df[[
#         "Rating",
#         "Rating.1",
#         "Projects"
#     ]].head()
# )


# -------------------------
# 7. Create feature matrix
# -------------------------

X = np.hstack([
    technical_encoded,
    programming_encoded,
    soft_encoded,
    ml_df[["Rating", "Rating.1", "Projects"]].values
])

y = ml_df["Career Interest"].values

# print("\nX shape:", X.shape)
# print("y shape:", y.shape)

# print("\nFirst X row:")
# print(X[0])

# print("\nFirst y value:")
# print(y[0])

# -------------------------
# 8. Train / Test split
# -------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# print("\nTraining data:", X_train.shape)
# print("Testing data:", X_test.shape)

# print("\nTraining career distribution:")
# print(pd.Series(y_train).value_counts())

# print("\nTesting career distribution:")
# print(pd.Series(y_test).value_counts())

# -------------------------
# 9. Train model
# -------------------------

# model = RandomForestClassifier(
#     n_estimators=200,
#     random_state=42
# )

# model.fit(X_train, y_train)

# y_pred = model.predict(X_test)

# print("\nFirst 10 predictions:")
# print(y_pred[:10])

# -------------------------
# 10. Evaluate model
# -------------------------

# accuracy = accuracy_score(y_test, y_pred)

# print("\nAccuracy:", accuracy)
# print("Accuracy (%):", accuracy * 100)

# print("\nClassification Report:")
# print(
#     classification_report(
#         y_test,
#         y_pred
#     )
# )

# print("\nCareer vs Technical Skills:")

# for skill in technical_mlb.classes_:
#     students_with_skill = ml_df[
#         ml_df["Technical Skills"].apply(
#             lambda skills: skill in skills
#         )
#     ]

#     print(f"\n{skill}:")
#     print(
#         students_with_skill["Career Interest"]
#         .value_counts()
#     )

print("\nCareer vs Programming Languages:")

for language in programming_mlb.classes_:
    students_with_language = ml_df[
        ml_df["Programming Languages"].apply(
            lambda languages: language in languages
        )
    ]

    print(f"\n{language}:")
    print(
        students_with_language["Career Interest"]
        .value_counts()
    )