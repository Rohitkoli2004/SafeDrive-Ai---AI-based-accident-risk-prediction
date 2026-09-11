🚗 SafeDrive AI
AI-Based Accident Risk Prediction System
SafeDrive AI is a machine-learning-powered web application designed to predict accident risk using location, weather conditions, and time-related factors. The system combines machine learning, real-time weather information, and interactive maps to provide users with meaningful accident-risk insights.

🌟 Overview
Road accidents can be influenced by multiple environmental and geographical factors. SafeDrive AI uses a data-driven approach to analyze these factors and generate accident-risk predictions.
The application provides an interactive interface where users can:
•	Predict accident risk based on relevant input factors
•	Use location information for prediction
•	Retrieve real-time weather information
•	Visualize locations using interactive maps
•	View prediction results and risk levels
•	Access prediction history and analytics
•	Manage their user account

✨ Key Features
Feature	Description
🔐 User Authentication	Registration, login, and account management
🤖 AI Risk Prediction	Machine-learning-based accident-risk prediction
📍 Location Analysis	Uses geographical location as a prediction factor
🌦️ Weather Integration	Retrieves weather information through OpenWeather API
🗺️ Interactive Maps	Location visualization using Leaflet.js
📊 Risk Visualization	Presents prediction results in an easy-to-understand format
📈 Analytics Dashboard	Provides insights from prediction data
🕒 Prediction History	Maintains users' previous prediction information

🧠 How It Works
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

🛠️ Technology Stack
Backend
 
 
•	Python
•	FastAPI
Machine Learning
 
•	Scikit-learn
•	NumPy
•	Pandas
Frontend
 
 
 
•	HTML5
•	CSS3
•	JavaScript
•	Leaflet.js
Database
•	SQLite
External API
•	OpenWeather API
Development
•	Git
•	GitHub
•	Python Virtual Environment

📂 Project Structure
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
Note: Large datasets and trained model files are intentionally excluded from the Git repository.

⚙️ Getting Started
Prerequisites
Make sure you have installed:
•	Python 3.x
•	Git
•	A modern web browser

1. Clone the Repository
git clone https://github.com/Rohitkoli2004/SafeDrive-Ai---AI-based-accident-risk-prediction.git
cd SafeDrive-Ai---AI-based-accident-risk-prediction

2. Create a Virtual Environment
On Windows:
python -m venv venv
Activate the environment:
venv\Scripts\activate

3. Install Dependencies
pip install -r requirements.txt

4. Configure the Weather API
SafeDrive AI uses the OpenWeather API for weather information.
If an API key is required by your local configuration, store it securely as an environment variable.
Example:
OPENWEATHER_API_KEY=your_api_key_here
⚠️ Never commit API keys, passwords, or other credentials to GitHub.

5. Run the Application
Start the FastAPI application using the appropriate entry point configured in the project.
For example:
uvicorn main:app --reload
Then open the application in your browser.
Note: The exact command may vary depending on the FastAPI entry point used in your local configuration.

📊 Machine Learning Pipeline
SafeDrive AI follows a structured machine-learning workflow:
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
The repository includes:
•	clean.py — data cleaning and preprocessing
•	train.py — machine-learning model training
•	Demo.py — application/demo functionality
•	notebooks/ — machine-learning and data-analysis work

📍 Prediction Factors
The prediction system considers factors related to:
•	Location
•	Weather conditions
•	Time
These inputs are processed by the machine-learning component to generate an accident-risk prediction.

🗺️ Mapping & Visualization
SafeDrive AI integrates Leaflet.js to provide interactive map functionality.
The mapping component supports location-based visualization and helps users understand geographical aspects of accident-risk predictions.

🗄️ Database
The application uses SQLite for local data storage.
The database supports functionality including:
•	User registration
•	User authentication
•	Account management
•	Prediction-related information

🔒 Security & Privacy
The project follows basic security practices for local development:
•	API keys should be stored securely.
•	.env files should not be committed.
•	User credentials and private information should not be uploaded.
•	Local database files should remain excluded where appropriate.
•	The Python virtual environment should not be committed.
The repository's .gitignore excludes:
venv/
__pycache__/
*.pyc
.env
data/accident_data.csv
models/accident_model.joblib
*.db

📦 Large Files
The following files are intentionally excluded from GitHub because of their size:
data/accident_data.csv
models/accident_model.joblib
They remain available in the local development environment when required by the application.

🚀 Future Enhancements
•	📱 Mobile application
•	🚦 Live traffic-data integration
•	🛣️ Route-based accident-risk prediction
•	☁️ Cloud deployment
•	🚨 Emergency alert system
•	📍 Advanced geographical risk analysis
•	📊 Improved predictive analytics

🎯 Objectives
The primary objectives of SafeDrive AI are to:
1.	Develop an AI-based accident-risk prediction system.
2.	Analyze location, weather, and time-related factors.
3.	Provide an interactive web-based prediction platform.
4.	Visualize accident-risk information using maps and analytics.
5.	Support data-driven road-safety awareness.

📸 Screenshots
Screenshots of the application here to showcase the user interface.
Login / Registration
<img width="1096" height="825" alt="Login page" src="https://github.com/user-attachments/assets/000cbc20-fce6-4aa5-ba97-6b990641a5a4" />

Prediction Dashboard
<img width="1806" height="911" alt="Dashboard" src="https://github.com/user-attachments/assets/d23bc40d-3d39-45ec-9152-9dcbcc46a323" />

Accident Risk Result
<img width="1841" height="907" alt="Low risk" src="https://github.com/user-attachments/assets/d5de0131-9b7d-48c8-97d5-1a52534f05dc" />

Analytics
<img width="1887" height="725" alt="Analytics" src="https://github.com/user-attachments/assets/d45e5c74-2f1a-48a0-b71e-0b3529934c17" />

👨‍💻 Author
Rohit Koli
SafeDrive AI – AI-Based Accident Risk Prediction System

📚 Project Type
Academic / Educational Project
Built to demonstrate the application of Machine Learning, Web Development, API Integration, Database Management, and Data Visualization to a real-world road-safety problem.

⭐ Support
If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

