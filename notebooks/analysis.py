{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "a29b39e9",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "import pandas as pd\n",
    "import numpy as np\n",
    "\n",
    "from sklearn.model_selection import train_test_split\n",
    "from sklearn.ensemble import RandomForestClassifier\n",
    "from sklearn.metrics import accuracy_score\n",
    "\n",
    "import joblib"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "d3511236",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "df = pd.read_csv(\"../data/accident_data.csv\")\n",
    "\n",
    "df.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "69d6e858",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "X = df[['weather','traffic','road_condition']]\n",
    "y = df['accident']"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "4fbdd5d4",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "X_train,X_test,y_train,y_test = train_test_split(\n",
    "    X,y,test_size=0.2,random_state=42\n",
    ")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "7ba99597",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "model = RandomForestClassifier()\n",
    "\n",
    "model.fit(X_train,y_train)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "3f143fc6",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "y_pred = model.predict(X_test)\n",
    "\n",
    "print(\"Accuracy:\",accuracy_score(y_test,y_pred))"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "62a93e74",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "joblib.dump(model,\"../models/accident_model.joblib\")"
   ]
  }
 ],
 "metadata": {
  "language_info": {
   "name": "python"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
