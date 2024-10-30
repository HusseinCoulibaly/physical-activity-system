import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import joblib

# Charger les données d'entraînement et de test
X_train = pd.read_csv('dataset/X_train.txt', delim_whitespace=True, header=None)
y_train = pd.read_csv('dataset/y_train.txt', delim_whitespace=True, header=None)
X_test = pd.read_csv('dataset/X_test.txt', delim_whitespace=True, header=None)
y_test = pd.read_csv('dataset/y_test.txt', delim_whitespace=True, header=None)

# Fusionner les ensembles d'entraînement et de test
X = pd.concat([X_train, X_test], axis=0)
y = pd.concat([y_train, y_test], axis=0)

# Renommer la colonne de la cible pour une meilleure lisibilité
y.columns = ['activity']

# Mapper les activités en étiquettes lisibles
activity_labels = {
    1: "walking",
    2: "walking_upstairs",
    3: "walking_downstairs",
    4: "sitting",
    5: "standing",
    6: "laying"
}
y['activity'] = y['activity'].map(activity_labels)

# Diviser les données pour l'entraînement et la validation
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
