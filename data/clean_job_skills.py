import pandas as pd
import csv


# =========================
# 1. Read the CSV file
# =========================

rows = []

with open("./job_role_skills.csv", "r", encoding="utf-8") as file:

    reader = csv.reader(file)

    for row in reader:

        # Skip empty rows
        if not row:
            continue

        # Sometimes the entire row is inside one quoted field
        if len(row) == 1:

            row = row[0].strip()

            # Remove surrounding quotes
            if row.startswith('"') and row.endswith('"'):
                row = row[1:-1]

            # Now split into the 4 actual columns
            row = row.split(",")

        rows.append(row)


# =========================
# 2. Create DataFrame
# =========================

df = pd.DataFrame(
    rows[1:],
    columns=rows[0]
)


# =========================
# 3. Clean column names
# =========================

df.columns = [
    column.strip().strip('"')
    for column in df.columns
]


# =========================
# 4. Skill aliases
# =========================

skill_aliases = {
    "ml": "machine learning"
}


# =========================
# 5. Skill cleaning function
# =========================

def split_skills(skills):

    if pd.isna(skills):
        return []

    skills = skills.lower()

    skills = skills.split("|")

    result = []

    for skill in skills:

        skill = skill.strip()

        if skill:

            if skill in skill_aliases:
                skill = skill_aliases[skill]

            result.append(skill)

    return result


# =========================
# 6. Clean skill columns
# =========================

df["required_skills"] = df["required_skills"].apply(split_skills)

df["optional_skills"] = df["optional_skills"].apply(split_skills)


# =========================
# 7. Clean text columns
# =========================

df["job_role"] = df["job_role"].str.strip()

df["experience_level"] = df["experience_level"].str.strip()


# =========================
# 8. Display final result
# =========================

# print("\nCLEANED DATA:\n")

# print(df.to_string(index=False))


# print("\n\nCOLUMNS:\n")

# print(df.columns.tolist())


# print("\n\nDATA TYPES:\n")

# print(df.dtypes)

df.to_json(
    "./cleaned_job_roles.json",
    orient="records",
    indent=2
)