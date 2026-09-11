import sqlite3
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import joblib
import os

app = FastAPI()

# =====================================================
# HOME ROUTE
# =====================================================

@app.get("/")
def home():
    return {"message": "SafeDrive AI Backend Running"}


# =====================================================
# DATABASE MODEL
# =====================================================

class LoginData(BaseModel):
    username: str
    password: str
class DeleteUser(BaseModel):
    username: str

# =====================================================
# LOGIN API
# =====================================================

@app.post("/login")
def login(data: LoginData):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE username=? AND password=?",
        (data.username, data.password)
    )

    user = cursor.fetchone()

    conn.close()

    if user:
        return {"status": "success"}

    return {"status": "fail"}


# =====================================================
# SIGNUP API
# =====================================================

@app.post("/signup")
def signup(data: LoginData):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE username=?",
        (data.username,)
    )

    existing = cursor.fetchone()

    if existing:
        conn.close()
        return {"status": "exists"}

    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (data.username, data.password)
    )

    conn.commit()
    conn.close()

    return {"status": "created"}

# -------------------------------
# DELETE USER API
# -------------------------------
@app.post("/delete-user")
def delete_user(data: DeleteUser):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM users WHERE username=?",
        (data.username,)
    )

    conn.commit()

    deleted_rows = cursor.rowcount

    conn.close()

    if deleted_rows > 0:

        return {
            "status": "deleted"
        }

    else:

        return {
            "status": "not_found"
        }
    
# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# LOAD ML MODEL
# =====================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(
    BASE_DIR,
    "..",
    "models",
    "accident_model.joblib"
)

model = joblib.load(model_path)


# =====================================================
# PREDICTION API
# =====================================================

@app.get("/predict")
def predict(

    lat: float,
    lng: float,
    distance: float,
    temp: float,
    humidity: float,
    visibility: float,
    wind_speed: float,
    precipitation: float,
    weather: int,
    signal: int,
    day: int,
    hour: float
):

    # =================================================
    # EXTRA FEATURES
    # =================================================

    is_rush_hour = 1 if (
        7 <= hour <= 10 or
        17 <= hour <= 20
    ) else 0

    is_bad_weather = 1 if (
        visibility < 5 or
        precipitation > 0.2
    ) else 0


    # =================================================
    # MODEL INPUT
    # =================================================

    data = np.array([[
        lat,
        lng,
        distance,
        temp,
        humidity,
        visibility,
        wind_speed,
        precipitation,
        weather,
        signal,
        day,
        hour,
        is_rush_hour,
        is_bad_weather
    ]])


    # =================================================
    # ML PREDICTION
    # =================================================

    base_prob = float(model.predict_proba(data)[0][1])

    # Balanced amplification
    prob = base_prob * 2.0

    print("Original Probability:", base_prob)
    print("Adjusted Probability:", prob)


    # =================================================
    # SUPPORTING LOGIC (20%)
    # =================================================

    if visibility < 2:
        prob += 0.08

    if precipitation > 2:
        prob += 0.08

    if humidity > 85:
        prob += 0.05

    if wind_speed > 12:
        prob += 0.05

    if is_rush_hour:
        prob += 0.05


    # =================================================
    # LIMIT PROBABILITY
    # =================================================

    prob = min(prob, 1.0)


    # =================================================
    # FINAL AI DECISION
    # =================================================

    if prob >= 0.75:
        result = "HIGH"

    elif prob >= 0.45:
        result = "MEDIUM"

    else:
        result = "LOW"


    # =================================================
    # REASONS
    # =================================================

    reasons = []

    if precipitation > 2:
        reasons.append("Heavy Rain")

    if visibility < 2:
        reasons.append("Low Visibility")

    if humidity > 85:
        reasons.append("High Humidity")

    if wind_speed > 12:
        reasons.append("Strong Wind")

    if is_rush_hour:
        reasons.append("Rush Hour Traffic")

    if temp > 38:
        reasons.append("Extreme Temperature")

    if not reasons:
        reasons.append("Stable Driving Conditions")


    # =================================================
    # RESPONSE
    # =================================================

    return {

        "risk": result,

        "probability": round(prob * 100, 2),

        "reason": reasons,

        "weather_analysis": {

            "temperature": temp,

            "humidity": humidity,

            "visibility": visibility,

            "wind_speed": wind_speed,

            "precipitation": precipitation
        }
    }

