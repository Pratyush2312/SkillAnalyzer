import pandas as pd

# =========================
# 1. Read dataset
# =========================

df = pd.read_excel("./DMA DATASET.xlsx")


# =========================
# 2. Skill aliases
# =========================

skill_aliases = {
    "ml": "machine learning"
}


# =========================
# 3. Clean skill fields
# =========================

def split_skills(skills):

    if pd.isna(skills):
        return []

    skills = skills.lower().split(",")

    result = []

    for skill in skills:

        skill = skill.strip()

        if not skill:
            continue

        if skill in skill_aliases:
            skill = skill_aliases[skill]

        result.append(skill)

    return result


# =========================
# 4. Convert Projects
# =========================

def clean_projects(value):

    if pd.isna(value):
        return False

    return str(value).strip().lower() == "yes"


# =========================
# 5. Clean column names
# =========================

df.columns = [
    column.strip()
    for column in df.columns
]


# =========================
# 6. Remove empty column
# =========================

df = df.drop(columns=["Unnamed: 13"])


# =========================
# 7. Rename columns
# =========================

df = df.rename(columns={
    "Name": "name",
    "Email_ID": "email",
    "Year": "year",
    "Current Course": "current_course",
    "Technical Skills": "technical_skills",
    "Programming Languages": "programming_languages",
    "Rating": "technical_rating",
    "Soft Skills": "soft_skills",
    "Rating.1": "soft_skill_rating",
    "Projects": "projects",
    "Career Interest": "career_interest",
    "Challenges": "challenges",
    "Support required": "support_required",
    "Method": "method"
})

print("Columns after rename:")
print(df.columns.tolist())


# =========================
# 8. Clean skill columns
# =========================

df["technical_skills"] = (
    df["technical_skills"]
    .apply(split_skills)
)

df["programming_languages"] = (
    df["programming_languages"]
    .apply(split_skills)
)

df["soft_skills"] = (
    df["soft_skills"]
    .apply(split_skills)
)


# =========================
# 9. Clean projects
# =========================

df["projects"] = (
    df["projects"]
    .apply(clean_projects)
)


# =========================
# 10. Clean year
# =========================

df["year"] = (
    df["year"]
    .astype(str)
    .str.extract(r"(\d+)")[0]
    .astype("Int64")
)


# =========================
# 11. Remove unwanted rows
# =========================

df = df.dropna(subset=["name", "email"])


# =========================
# 12. Check final data
# =========================

print("\nCLEANED DATA:\n")

print(df.head().to_string(index=False))


print("\n\nCOLUMNS:\n")

print(df.columns.tolist())


print("\n\nDATA TYPES:\n")

print(df.dtypes)


# =========================
# 13. Export JSON
# =========================

df.to_json(
    "./cleaned_students.json",
    orient="records",
    indent=2
)

print("\n\ncleaned_students.json created successfully!")