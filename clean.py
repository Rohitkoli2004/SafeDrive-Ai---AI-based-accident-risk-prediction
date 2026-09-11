import pandas as pd

# load dataset
data = pd.read_csv("data/accident_data.csv")

# -------------------------------
# STEP 1: Drop unnecessary columns
# -------------------------------
data = data.drop([
    'ID','Source','Description','Street','City','County',
    'Zipcode','Country','Timezone','Airport_Code'
], axis=1, errors='ignore')

# -------------------------------
# STEP 2: Convert time to hour
# -------------------------------
data['Start_Time'] = pd.to_datetime(data['Start_Time'], errors='coerce')
data['hour'] = data['Start_Time'].dt.hour
data = data.drop(['Start_Time'], axis=1)

# -------------------------------
# STEP 3: Remove missing values
# -------------------------------
data = data.dropna()

# -------------------------------
# STEP 4: Convert categorical columns
# -------------------------------
data['Weather_Condition'] = data['Weather_Condition'].astype('category').cat.codes
data['Sunrise_Sunset'] = data['Sunrise_Sunset'].map({'Day':1,'Night':0})

# -------------------------------
# STEP 5: Convert boolean to int
# -------------------------------
bool_cols = data.select_dtypes(include=['bool']).columns
data[bool_cols] = data[bool_cols].astype(int)

# -------------------------------
# STEP 6: Feature Selection (IMPORTANT)
# -------------------------------
data = data[[
    'Severity',
    'Start_Lat',
    'Start_Lng',
    'Distance(mi)',
    'Temperature(F)',
    'Humidity(%)',
    'Visibility(mi)',
    'Wind_Speed(mph)',
    'Precipitation(in)',
    'Weather_Condition',
    'Traffic_Signal',
    'Sunrise_Sunset',
    'hour'
]]

# -------------------------------
# STEP 7: Convert target variable
# -------------------------------
# 0 = Low Risk, 1 = High Risk
data['Severity'] = data['Severity'].apply(lambda x: 1 if x >= 3 else 0)

# -------------------------------
# STEP 8: Remove duplicates
# -------------------------------
data = data.drop_duplicates()

# -------------------------------
# FINAL CHECK
# -------------------------------
print("Final Shape:", data.shape)
print(data.info())
print(data.head())