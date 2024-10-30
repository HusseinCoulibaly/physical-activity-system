import pandas as pd
import joblib
from sklearn.neighbors import KNeighborsClassifier

# Charger les données d'entraînement et de test avec `sep='\s+'` pour éviter l'avertissement
X_train = pd.read_csv('dataset/X_train.txt', sep='\s+', header=None)
y_train = pd.read_csv('dataset/y_train.txt', sep='\s+', header=None)
X_test = pd.read_csv('dataset/X_test.txt', sep='\s+', header=None)
y_test = pd.read_csv('dataset/y_test.txt', sep='\s+', header=None)

# Renommer la colonne de la cible pour une meilleure lisibilité
y_train.columns = ['activity']
y_test.columns = ['activity']

# Mapper les activités en étiquettes lisibles
activity_labels = {
    1: "walking",
    2: "walking_upstairs",
    3: "walking_downstairs",
    4: "sitting",
    5: "standing",
    6: "laying"
}
y_train['activity'] = y_train['activity'].map(activity_labels)
y_test['activity'] = y_test['activity'].map(activity_labels)

# Entraîner un modèle KNN
model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train, y_train.values.ravel())

# Sauvegarder le modèle dans un fichier
joblib.dump(model, 'recommendation_model.pkl')
print("Modèle de recommandation entraîné et sauvegardé.")
