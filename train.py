import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.ensemble import RandomForestClassifier
from imblearn.over_sampling import SMOTE
import joblib

# -------------------------------
# LOAD DATA
# -------------------------------
data = pd.read_csv("data/accident_data.csv")

# -------------------------------
# CLEANING
# -------------------------------
data = data.drop([
    'ID','Source','Description','Street','City','County',
    'Zipcode','Country','Timezone','Airport_Code'
], axis=1, errors='ignore')

# Time → hour
data['Start_Time'] = pd.to_datetime(data['Start_Time'], errors='coerce')
data['hour'] = data['Start_Time'].dt.hour

# NEW FEATURES
data['is_rush_hour'] = data['hour'].apply(lambda x: 1 if (7 <= x <= 10 or 17 <= x <= 20) else 0)

data['is_bad_weather'] = (
    (data['Visibility(mi)'] < 5) |
    (data['Precipitation(in)'] > 0.2)
).astype(int)

data = data.drop(['Start_Time'], axis=1)

data = data.dropna()

# Encode
data['Weather_Condition'] = data['Weather_Condition'].astype('category').cat.codes
data['Sunrise_Sunset'] = data['Sunrise_Sunset'].map({'Day':1,'Night':0})

# Bool → int
bool_cols = data.select_dtypes(include=['bool']).columns
data[bool_cols] = data[bool_cols].astype(int)

# Select features
data = data[[
    'Severity',
    'Start_Lat','Start_Lng','Distance(mi)','Temperature(F)',
    'Humidity(%)','Visibility(mi)','Wind_Speed(mph)',
    'Precipitation(in)','Weather_Condition',
    'Traffic_Signal','Sunrise_Sunset','hour',
    'is_rush_hour','is_bad_weather'
]]

# Target
data['Severity'] = data['Severity'].apply(lambda x: 1 if x >= 3 else 0)

data = data.drop_duplicates()

# Reduce size (speed)
data = data.sample(200000, random_state=42)

# -------------------------------
# SPLIT
# -------------------------------
X = data.drop('Severity', axis=1)
y = data['Severity']

# SMOTE (important)
sm = SMOTE(random_state=42)
X, y = sm.fit_resample(X, y)

print("After SMOTE:", np.bincount(y))

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -------------------------------
# MODEL
# -------------------------------
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    class_weight='balanced',
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# -------------------------------
# EVALUATION
# -------------------------------
pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, pred))
print(classification_report(y_test, pred))

probs = model.predict_proba(X_test)[:,1]

print("Min prob:", np.min(probs))
print("Max prob:", np.max(probs))
print("Avg prob:", np.mean(probs))

# -------------------------------
# SAVE MODEL
# -------------------------------
joblib.dump(model, "models/accident_model.joblib")

print("Model saved!")