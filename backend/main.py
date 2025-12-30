import os
import json
import uvicorn
from fastapi import FastAPI, Response, Request, HTTPException, Security, Depends, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

# Import your custom model logic
from app.models.CardioModel import CardioModel

# --- CONFIGURATION ---
load_dotenv()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Security Settings
API_KEY_NAME = "x-api-key"
API_KEY_SECRET = os.getenv("API_KEY_SECRET", "fallback-secret-for-dev")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "https://cardioml.vercel.app,http://localhost:3000").split(",")

# Initialize FastAPI
app = FastAPI(
    title="CardioML Backend",
    description="Backend APIs for Cardiovascular Risk Prediction",
    version="1.0.0",
)

# --- RATE LIMITER SETUP ---
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests. Please wait and try again."},
    )

# --- SECURITY DEPENDENCY ---
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def validate_api_key(api_key: str = Security(api_key_header)):
    if api_key == API_KEY_SECRET:
        return api_key
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Invalid or missing API Key",
    )

# --- MODEL INITIALIZATION ---
model_path = os.path.join(BASE_DIR, "app", "models", "cardio_model_pipeline.pkl")
predictor = CardioModel(model_path)

# --- SCHEMAS ---
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

# --- ROUTES ---

@app.get("/")
@limiter.limit("10/minute")
def read_root(request: Request):
    return {"status": "Backend is running"}

@app.get("/model-info")
@limiter.limit("5/minute")
async def get_modelinfo(request: Request, api_key: str = Depends(validate_api_key)):
    info_path = os.path.join(BASE_DIR, "app", "models", "model-info.json")
    try:
        with open(info_path, "r") as f:
            data = json.load(f)
        return data 
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Model info not found")

@app.get("/data-insight")
@limiter.limit("5/minute")
async def get_datainsight(request: Request, api_key: str = Depends(validate_api_key)):
    insight_path = os.path.join(BASE_DIR, "app","models","data-insight.json")
    try:
        with open(insight_path,"r") as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Data insights not found")

@app.post("/predict")
@limiter.limit("10/minute")
async def get_prediction(
    request: Request, 
    payload: PatientSchema, 
    api_key: str = Depends(validate_api_key)
):
    data_dict = payload.model_dump()
    result, chance = predictor.predict(data_dict)
    
    return {
        "is_cardio": int(result),
        "probability": f"{chance:.2%}",
        "status": "High Risk" if result == 1 else "Low Risk"
    }

# --- MIDDLEWARE & CORS ---

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Manual OPTIONS override for Vercel/CORS preflight
@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str, response: Response):
    # This ensures the browser knows x-api-key is an allowed header
    response.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGINS[0] if ALLOWED_ORIGINS else "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, x-api-key"
    return response

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)