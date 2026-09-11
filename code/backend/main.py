import sqlite3
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import joblib
import os

app = FastAPI()

# -------------------------------
@app.get("/")
def home():
    return {"message": "Backend Running"}

# -------------------------------
# DATABASE MODEL
# -------------------------------
class LoginData(BaseModel):
    username: str
    password: str

# -------------------------------
# LOGIN API
# -------------------------------
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
    else:
        return {"status": "fail"}

# -------------------------------
# SIGNUP API
# -------------------------------
@app.post("/signup")
def signup(data: LoginData):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username=?", (data.username,))
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
# CORS
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# LOAD MODEL
# -------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "..", "models", "accident_model.joblib")

model = joblib.load(model_path)

# -------------------------------
# PREDICT API
# -------------------------------
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
    is_rush_hour = 1 if (7 <= hour <= 10 or 17 <= hour <= 20) else 0
    is_bad_weather = 1 if (visibility < 5 or precipitation > 0.2) else 0

    data = np.array([[
        lat, lng, distance, temp, humidity,
        visibility, wind_speed, precipitation,
        weather, signal, day, hour,
        is_rush_hour, is_bad_weather
    ]])

    prob = model.predict_proba(data)[0][1]

    if precipitation > 1 or visibility < 2:
        result = "HIGH"
    elif humidity > 80 and wind_speed > 10:
        result = "HIGH"
    elif precipitation == 0 and visibility > 8 and humidity < 50:
        result = "LOW"
    else:
        result = "MEDIUM"

    reasons = []

    if precipitation > 1:
        reasons.append("Heavy Rain")
    if visibility < 2:
        reasons.append("Low Visibility")
    if humidity > 80:
        reasons.append("High Humidity")

    if not reasons:
        reasons.append("Normal Conditions")

    return {
        "risk": result,
        "probability": float(prob),
        "reason": reasons
    }