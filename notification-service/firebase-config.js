const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Assure-toi que le nom est correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
