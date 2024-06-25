const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "inventroy-system-6f189.firebaseapp.com"
});

const db = admin.firestore();

module.exports = { admin, db };
