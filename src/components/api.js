// src/components/api.js
import { db } from './firebaseConfig'; // Adjust the path based on where you have your firebaseConfig.js

export const getContent = async () => {
  const snapshot = await db.collection('yourCollection').get(); // Change 'yourCollection' to your actual Firestore collection name
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateContent = async (id, newData) => {
  await db.collection('yourCollection').doc(id).update({ text: newData }); // Adjust the field as necessary
};
