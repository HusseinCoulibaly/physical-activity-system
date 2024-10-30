import numpy as np
import joblib
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split

# Données d'entraînement
X = np.array([
    [70, 150, 5000], [90, 300, 7000], [85, 250, 6500], [60, 100, 3000], [80, 220, 6000],
    [95, 320, 8000], [65, 110, 4000], [75, 170, 5200], [88, 280, 6800], [92, 310, 7500],
    [78, 190, 5400], [64, 120, 3500], [85, 260, 6200], [90, 295, 7100], [72, 160, 5000],
    [81, 230, 5900], [70, 155, 4800], [94, 340, 7800], [60, 105, 3100], [77, 180, 5600],
    [89, 275, 6700], [95, 330, 8000], [74, 165, 5100], [83, 225, 5800], [68, 145, 4600],
    [92, 315, 7300], [62, 115, 3300], [80, 240, 6100], [87, 265, 6500], [79, 195, 5700]
])

y = np.array([
    "marche", "course", "vélo", "yoga", "marche", "course", "yoga", "marche",
    "vélo", "course", "marche", "yoga", "vélo", "course", "marche", "marche",
    "marche", "course", "yoga", "marche", "vélo", "course", "marche", "marche",
    "marche", "course", "yoga", "vélo", "vélo", "marche"
])

# Diviser les données pour l'entraînement et les tests
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entraîner le modèle
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)

# Sauvegarder le modèle
joblib.dump(model, 'recommendation_model.pkl')
print("Modèle entraîné et sauvegardé avec succès.")
