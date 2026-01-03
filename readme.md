# CardioML

CardioML is a full stack machine learning project that analyzes and predicts cardiovascular disease risk from clinical data. The project demonstrates the end to end ML workflow: data cleaning and exploration, model development, validation, and deployment behind a user friendly web interface.

Live demo: [https://cardioml.vercel.app/](https://cardioml.vercel.app/)

---

## Table of contents

* Project overview
* Key features
* Tech stack
* Repository structure
* Quick start

  * prerequisites
  * backend (FastAPI)
  * frontend (Next.js)
* Model training and evaluation
* API
* Screenshots to include for marketing
* Development notes
* Contributing
* License
* Contact

---

## Project overview

CardioML accepts clinical inputs such as age, blood pressure, cholesterol, and lifestyle factors and returns a probability based prediction of cardiovascular disease risk. The application focuses on clarity, fast inference, and responsible AI usage.

The repository contains a Python backend that serves model inference and a TypeScript React frontend built with Next.js.

---

## Key features

* Interactive form for entering clinical features
* Real time prediction via API calls to a FastAPI service
* Probability based output and simple explanation for users
* Data cleaning and outlier handling applied during preprocessing
* Notebook(s) capturing exploratory data analysis and model experiments

---

## Tech stack

* Frontend: Next.js (TypeScript)
* Backend: FastAPI (Python)
* Machine learning: Python (scikit-learn compatible model; Gradient Boosting Classifier mentioned)
* Deployment: Vercel for frontend, API can be deployed to any cloud provider or served behind a reverse proxy
* Data and notebooks: Jupyter Notebooks included in the repository

---

## Repository structure (high level)

```
CardioML/
├─ backend/        # FastAPI app, model serving, requirements
├─ frontend/       # Next.js app
├─ deploy/         # Deployment scripts / Docker / nginx (optional)
├─ *.ipynb         # Notebooks for EDA and model training
├─ .gitignore
```

Note: file and folder names reflect the repository structure observed. If you want exact paths or help publishing specific scripts, provide the file list or allow access and I will extract precise commands.

---

## Quick start

These are general instructions that match a standard Next.js + FastAPI project. Adjust names or paths if your repository uses different entrypoints.

### Prerequisites

* Node.js 18+ and npm or yarn
* Python 3.9+ and pip
* (Optional) virtualenv or conda

### Backend (FastAPI)

1. Open a terminal and change into the backend folder:

```bash
cd backend
```

2. Create and activate a Python virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate   # macOS / Linux
.venv\Scripts\activate     # Windows
```

3. Install dependencies (if `requirements.txt` exists):

```bash
pip install -r requirements.txt
```

4. Start the FastAPI server (common entrypoint `app/main.py` or `main.py`):

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

If the project exposes a different module path, replace `app.main:app` with the appropriate import path.

### Frontend (Next.js)

1. Change into the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

The Next.js app typically runs at [http://localhost:3000](http://localhost:3000). Configure environment variables (for API base URL) using `.env.local` if required.

---

## Model training and evaluation

* Model: Gradient Boosting Classifier (notebook files contain training code and hyperparameters)
* Dataset: repository contains Jupyter notebooks; source dataset is commonly the Kaggle cardiovascular disease dataset (70k records). Confirm the exact dataset file path in the repo.
* Reported performance: **73.4 percent accuracy** after data cleaning and outlier handling.

Suggested training workflow

1. Open the training notebook (e.g., `notebooks/train.ipynb`).
2. Inspect preprocessing steps and feature pipeline.
3. Re-run cells or extract the preprocessing pipeline to a module if you plan to retrain programmatically.
4. Save final model artifact into `backend/models/` (pickle, joblib).

---

## API

A typical API surface for this project is one or two endpoints such as:

* `GET /` health check
* `POST /predict` request body contains clinical features and returns prediction and probability

Example request

```json
POST /predict
Content-Type: application/json

{
  "age": 55,
  "ap_hi": 140,
  "ap_lo": 90,
  "cholesterol": 2,
  "bmi": 27.5,
  "smoke": 0,
  "alco": 0,
  "active": 1
}
```

Example response

```json
{
  "risk": "low",
  "probability": 0.12,
  "confidence": 0.88
}
```

Adjust field names to match your backend payload.

---

## Screenshots and assets to include in README or marketing

Include a small gallery near the top of the README and in your LinkedIn post. Suggested images:

1. Hero screenshot of the landing page
2. Input form where user enters clinical values
3. Prediction results page showing probability and explanation
4. Simple architecture diagram (Frontend → Backend (FastAPI) → Model)
5. Notebook snapshot showing model evaluation metrics or confusion matrix

Keep images small and compressed and add alt text.

---

## Development notes and suggestions

* Consider moving preprocessing into a versioned pipeline (scikit-learn Pipeline or mlflow) so the same transformations apply during training and inference.
* Add unit tests for the API schema and example inference inputs.
* Add a lightweight integration test that calls `/predict` with a canned payload.
* Store model artifacts in `backend/models/` and include a simple loader function.
* Add environment variable examples (`.env.example`) for API base URL and model path.

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a branch `feature/your-feature`
3. Implement changes and add tests
4. Open a pull request with a clear description

Add a CONTRIBUTING.md if you expect others to contribute regularly.

---

## License

If you have a license pick one and add a license file. If you want a recommendation, MIT is a permissive choice for projects intended to demonstrate work.

---

## Contact

Keval Kansagra

Project: CardioML

Live demo: [https://cardioml.vercel.app/](https://cardioml.vercel.app/)

---

### Notes about repository exploration

I examined the repository root and confirmed the presence of `backend`, `frontend`, and `deploy` folders and several Jupyter notebooks. Some file specifics and exact entrypoints were not accessible due to GitHub page rendering limitations during the automated scan. If you would like a README with exact commands and file references, paste the names of the main entry files or grant access and I will update the README to match the repository exactly.
