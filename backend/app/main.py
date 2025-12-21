from fastapi import FastAPI, Response
from pydantic import BaseModel
from app.models.CardioModel import CardioModel
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
import os

app = FastAPI(
    title="CardioML Backend",
    description="Backend Apis That Responses to froms",
    version="1.0.0",
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "models", "cardio_model_pipeline.pkl")

predictor = CardioModel(model_path)

class PatientSchema(BaseModel):

    age: int = Field(..., ge=18, le=120)
    gender: int = Field(..., description="1 for women, 2 for men")
    height: float = Field(..., ge=100, le=250)
    weight: float = Field(..., ge=30, le=300)
    ap_hi: int = Field(..., ge=60, le=250)
    ap_lo: int = Field(..., ge=40, le=150)
    cholesterol: int = Field(..., ge=1, le=3)
    gluc: int = Field(..., ge=1, le=3)
    smoke: bool = False
    alco: bool = False
    active: bool = False

    
@app.post("/predict")
async def get_prediction(payload: PatientSchema):
    data_dict = payload.model_dump()
    result, chance = predictor.predict(data_dict)
    
    return {
        "is_cardio": result,
        "probability": f"{chance:.2%}",
        "status": "High Risk" if result == 1 else "Low Risk"
    }



app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://cardioml.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Manual OPTIONS override for Vercel
@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str, response: Response):
    response.headers["Access-Control-Allow-Origin"] = "https://cardioml.vercel.app"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
