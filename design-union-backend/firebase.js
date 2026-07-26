// // backend/firebase.js
// const admin = require("firebase-admin");

// const {
//   FIREBASE_PROJECT_ID,
//   FIREBASE_CLIENT_EMAIL,
//   FIREBASE_PRIVATE_KEY,
//   FIREBASE_STORAGE_BUCKET,
// } = process.env;

// if (
//   !FIREBASE_PROJECT_ID ||
//   !FIREBASE_CLIENT_EMAIL ||
//   !FIREBASE_PRIVATE_KEY ||
//   !FIREBASE_STORAGE_BUCKET
// ) {
//   throw new Error("Missing Firebase environment variables");
// }

// const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: FIREBASE_PROJECT_ID,
//       clientEmail: FIREBASE_CLIENT_EMAIL,
//       privateKey,
//     }),
//     storageBucket: FIREBASE_STORAGE_BUCKET,
//   });
// }

// module.exports = admin.storage().bucket();
