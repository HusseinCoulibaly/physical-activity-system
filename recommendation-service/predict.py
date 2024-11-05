import sys
import joblib
import numpy as np

# Charger le modèle
model = joblib.load('recommendation_model.pkl')

# Récupérer les données d'entrée
try:
    input_features = np.array([float(x) for x in sys.argv[1:]]).reshape(1, -1)
    prediction = model.predict(input_features)
    print(prediction[0])  
except Exception as e:
    print(f"Erreur dans le script Python: {e}")
    sys.exit(1)  
