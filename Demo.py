import pandas as pd

data = pd.read_csv("data/accident_data.csv", nrows=100000)

print(data.head())
print(data.columns)