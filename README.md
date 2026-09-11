# 🚗 SafeDrive AI

### AI-Based Accident Risk Prediction System

**SafeDrive AI** is a machine-learning-powered web application designed to predict accident risk using **location, weather conditions, and time-related factors**. The system combines machine learning, real-time weather information, and interactive maps to provide users with meaningful accident-risk insights.

---

## 🌟 Overview

Road accidents can be influenced by multiple environmental and geographical factors. SafeDrive AI uses a data-driven approach to analyze these factors and generate accident-risk predictions.

The application provides an interactive interface where users can:

* Predict accident risk based on relevant input factors
* Use location information for prediction
* Retrieve real-time weather information
* Visualize locations using interactive maps
* View prediction results and risk levels
* Access prediction history and analytics
* Manage their user account

---

## ✨ Key Features

| Feature                     | Description                                                 |
| --------------------------- | ----------------------------------------------------------- |
| 🔐 **User Authentication**  | Registration, login, and account management                 |
| 🤖 **AI Risk Prediction**   | Machine-learning-based accident-risk prediction             |
| 📍 **Location Analysis**    | Uses geographical location as a prediction factor           |
| 🌦️ **Weather Integration** | Retrieves weather information through OpenWeather API       |
| 🗺️ **Interactive Maps**    | Location visualization using Leaflet.js                     |
| 📊 **Risk Visualization**   | Presents prediction results in an easy-to-understand format |
| 📈 **Analytics Dashboard**  | Provides insights from prediction data                      |
| 🕒 **Prediction History**   | Maintains users' previous prediction information            |

---

## 🧠 How It Works

```text
        User Input
            │
            ▼
   Location & Time Data
            │
            ▼
     Weather Information
            │
            ▼
      Data Processing
            │
            ▼
    Machine Learning Model
            │
            ▼
     Accident Risk Score
            │
            ▼
   Risk Visualization
            │
            ▼
      Analytics / Map
```

---

## 🛠️ Technology Stack

### Backend

![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)

* Python
* FastAPI

### Machine Learning

![Scikit-learn](https://img.shields.io/badge/Scikit--learn-ML-F7931E?logo=scikit-learn)

* Scikit-learn
* NumPy
* Pandas

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)

* HTML5
* CSS3
* JavaScript
* Leaflet.js

### Database

* SQLite

### External API

* OpenWeather API

### Development

* Git
* GitHub
* Python Virtual Environment

---

## 📂 Project Structure

```text
SafeDrive-AI/
│
├── backend/
│   └── Backend application files
│
├── code/
│   └── Frontend and supporting files
│
├── frontend/
│   └── HTML, CSS and JavaScript files
│
├── notebooks/
│   └── Machine learning and data analysis notebooks
│
├── Demo.py
├── clean.py
├── train.py
├── requirements.txt
├── .gitignore
└── README.md
```

> **Note:** Large datasets and trained model files are intentionally excluded from the Git repository.

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Python 3.x
* Git
* A modern web browser

---

### 1. Clone the Repository

```bash
git clone https://github.com/Rohitkoli2004/SafeDrive-Ai---AI-based-accident-risk-prediction.git
```

```bash
cd SafeDrive-Ai---AI-based-accident-risk-prediction
```

---

### 2. Create a Virtual Environment

On Windows:

```bash
python -m venv venv
```

Activate the environment:

```bash
venv\Scripts\activate
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Configure the Weather API

SafeDrive AI uses the **OpenWeather API** for weather information.

If an API key is required by your local configuration, store it securely as an environment variable.

Example:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

> ⚠️ Never commit API keys, passwords, or other credentials to GitHub.

---

### 5. Run the Application

Start the FastAPI application using the appropriate entry point configured in the project.

For example:

```bash
uvicorn main:app --reload
```

Then open the application in your browser.

> **Note:** The exact command may vary depending on the FastAPI entry point used in your local configuration.

---

## 📊 Machine Learning Pipeline

SafeDrive AI follows a structured machine-learning workflow:

```text
Data Collection
       ↓
Data Cleaning
       ↓
Data Preparation
       ↓
Feature Processing
       ↓
Model Training
       ↓
Risk Prediction
       ↓
Visualization
       ↓
Analytics
```

The repository includes:

* `clean.py` — data cleaning and preprocessing
* `train.py` — machine-learning model training
* `Demo.py` — application/demo functionality
* `notebooks/` — machine-learning and data-analysis work

---

## 📍 Prediction Factors

The prediction system considers factors related to:

* **Location**
* **Weather conditions**
* **Time**

These inputs are processed by the machine-learning component to generate an accident-risk prediction.

---

## 🗺️ Mapping & Visualization

SafeDrive AI integrates **Leaflet.js** to provide interactive map functionality.

The mapping component supports location-based visualization and helps users understand geographical aspects of accident-risk predictions.

---

## 🗄️ Database

The application uses **SQLite** for local data storage.

The database supports functionality including:

* User registration
* User authentication
* Account management
* Prediction-related information

---

## 🔒 Security & Privacy

The project follows basic security practices for local development:

* API keys should be stored securely.
* `.env` files should not be committed.
* User credentials and private information should not be uploaded.
* Local database files should remain excluded where appropriate.
* The Python virtual environment should not be committed.

The repository's `.gitignore` excludes:

```text
venv/
__pycache__/
*.pyc
.env
data/accident_data.csv
models/accident_model.joblib
*.db
```

---

## 📦 Large Files

The following files are intentionally excluded from GitHub because of their size:

```text
data/accident_data.csv
models/accident_model.joblib
```

They remain available in the local development environment when required by the application.

---

## 🚀 Future Enhancements

* 📱 Mobile application
* 🚦 Live traffic-data integration
* 🛣️ Route-based accident-risk prediction
* ☁️ Cloud deployment
* 🚨 Emergency alert system
* 📍 Advanced geographical risk analysis
* 📊 Improved predictive analytics

---

## 🎯 Objectives

The primary objectives of SafeDrive AI are to:

1. Develop an AI-based accident-risk prediction system.
2. Analyze location, weather, and time-related factors.
3. Provide an interactive web-based prediction platform.
4. Visualize accident-risk information using maps and analytics.
5. Support data-driven road-safety awareness.

---

## 📸 Screenshots

> Add screenshots of the application here to showcase the user interface.

### Login / Registration

*Add screenshot here*

### Prediction Dashboard

*Add screenshot here*

### Accident Risk Result

*Add screenshot here*

### Analytics

*Add screenshot here*

---

## 🎥 Demo

Add a short demo video or GIF showing:

```text
Login → Enter Location → Get Weather → Predict Risk → View Result → Analytics
```

---

## 👨‍💻 Author

**Rohit Koli**

**SafeDrive AI – AI-Based Accident Risk Prediction System**

---

## 📚 Project Type

**Academic / Educational Project**

Built to demonstrate the application of **Machine Learning, Web Development, API Integration, Database Management, and Data Visualization** to a real-world road-safety problem.

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
