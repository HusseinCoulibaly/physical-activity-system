const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Tests des routes biometrics-service', () => {
  afterAll(async () => {
    // Ferme la connexion à MongoDB et arrête Jest
    await mongoose.connection.close();
  });

  it('devrait retourner une erreur si aucun token n’est fourni', async () => {
    const res = await request(app)
      .post('/api/health/add')
      .send({
        userId: '123',
        heartRate: 70,
        caloriesBurned: 250,
        steps: 5000,
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Accès refusé : Token manquant');
  });

  it('devrait ajouter des données de santé avec un token valide', async () => {
    const token = 'ton_token_jwt_valide'; // Remplace par un token JWT valide

    const res = await request(app)
      .post('/api/health/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: '123',
        heartRate: 70,
        caloriesBurned: 250,
        steps: 5000,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userId', '123');
  });
});
