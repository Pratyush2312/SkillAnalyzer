from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union, List

from predictor import predict_career


# ============================================================
# FASTAPI APP CONFIGURATION
# ============================================================

app = FastAPI(
    title="Startum ML Service",
    description="Career recommendation service for Startum",
    version="1.0.0"
)


# ============================================================
# CORS CONFIGURATION
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# REQUEST SCHEMA
# ============================================================

class StudentProfile(BaseModel):
    technical_skills: Union[str, List[str], None] = None
    programming_languages: Union[str, List[str], None] = None

    technical_rating: Union[int, float, None] = None
    soft_skills: Union[str, List[str], None] = None
    soft_skill_rating: Union[int, float, None] = None

    projects: Union[str, int, bool, None] = None
    project_count: Union[int, None] = None

    year: Union[int, None] = None
    current_course: Union[str, None] = None


# ============================================================
# HEALTH CHECK ROUTE
# ============================================================

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Startum ML service is running"
    }


# ============================================================
# CAREER PREDICTION ROUTE
# ============================================================

@app.post("/predict")
def predict(student: StudentProfile):
    try:
        student_data = student.model_dump()

        recommendations = predict_career(student_data)

        return {
            "success": True,
            "recommendations": recommendations
        }

    except Exception as error:
        print("Prediction error:", error)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate career recommendations: {str(error)}"
        )